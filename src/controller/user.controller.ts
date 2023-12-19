import { Request, Response } from "express";
import md5 from "md5";
import jwt, { JwtPayload } from "jsonwebtoken";
import userModel from "../models/user.model";
import { client } from "../services/database/redis";
import { APP_CONFIG, constants } from "../constants/constant";
import {
  handleErrorResponse,
  handleSuccessResponse,
} from "../lib/response.handler";
import * as dotenv from "dotenv";
import { join } from "path";
import otpModel from "../models/otp.model";
import { userService } from "../service/user.service";
import moment from "moment";
dotenv.config();

export const config = dotenv.config({
  path: join(process.cwd() + "/.env"),
});

//SIGN_UP
class UserController {
  async signup(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password, phoneNumber,dob,gender } = req.body;
      const existUser = await userModel.findOne({ email: email });
      if (existUser) {
        handleErrorResponse(
          res,
          constants.statusCode.alreadyExist,
          constants.message.exist
        );
      } else {
        const dobDate = dob ? moment(dob, 'DD-MM-YYYY').toDate() : undefined;
        const user = await userModel.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: md5(password),
          phoneNumber: phoneNumber,
          dob:dobDate,
          gender:gender
        });
        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET as string,
          {
            expiresIn: process.env.JWT_EXPIRES,
          }
        );
        client.hset(`user:${user._id}`, {
          _id: user._id.toString(),
          email: user.email,
          token: token,
        });
        client.expire(`user:${user._id}`, 120, (err, reply) => {
          if (err) {
            console.error(err);
          } else {
            console.log(`TTL set for user:${user._id}`);
          }
        });
        handleSuccessResponse(
          res,
          constants.statusCode.success,
          constants.message.signedup,
          user,
          token
        );
      }
    } catch (err: any) {
      handleErrorResponse(
        res,
        constants.statusCode.internalServerError,
        err.message
      );
    }
  }


  //LOGIN_API
  async login(req: Request, res: Response) {
    try {
      const { email, password, phoneNumber } = req.body;

      const existUser = await userModel.findOne({
        $or: [{ phoneNumber: phoneNumber }, { email: email }],
      });

      if (!existUser) {
        return handleErrorResponse(
          res,
          constants.statusCode.notFound,
          constants.message.notExist
        );
      }
      const verifypassword = md5(password) === existUser.password;
      if (!verifypassword) {
        return res.status(400).json({ message:constants.message.passwordNotMatched  });
      }

      const token = jwt.sign(
        { _id: existUser._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: process.env.JWT_EXPIRES,
        }
      );

      client.hset(`user:${existUser._id}`, {
        _id: existUser._id.toString(),
        email: existUser.email,
        token: token,
      });
      const expirationTimeInSeconds = 5 * 24 * 3600; // 5 days in seconds
        client.expire(`user:${existUser._id}`, expirationTimeInSeconds);

      //client.expire(`user:${existUser._id}`, 3600);

      const userExist = await otpModel.findOne({ phoneNumber: phoneNumber });
      const otp = Math.floor(1000 + Math.random() * 9000);

      if (existUser && userExist) {
        await otpModel.findOneAndUpdate(
          { phoneNumber: phoneNumber },
          { code: otp }
        );
      } else {
        await otpModel.create({ phoneNumber: phoneNumber, code: otp });
      }
      const success = await userService.sendOtpBySMS(otp, phoneNumber);
      if (success) {
        res.status(200).json({ message: constants.message.login, token });
      } else {
        res.status(500).json({ message: constants.message.errorSendingOtp });
      }
    } catch (err) {
      res.status(500).json({ message:constants.message.error });
    }
  }

  //FORGOT_PASSWORD
  async forgetPassword(req: Request, res: Response) {
    try {
      const { email, phoneNumber } = req.body;
      const user: any = await userModel.findOne({
        $or: [{ email: email }, { phoneNumber: phoneNumber }],
      });
      if (!user) {
        return handleErrorResponse(
          res,
          constants.statusCode.notFound,
          constants.message.notExist
        );
      }
      const userExist = await otpModel.findOne({ email: email });
      const otp = Math.floor(1000 + Math.random() * 9000);
      if (user && userExist) {
        await otpModel.findOneAndUpdate(
          { $or: [{ email: user.email }, { phoneNumber: user.phoneNumber }] },
          { code: otp }
        );
      } else {
        await otpModel.create({
          $or: [
            { email: req.body.email },
            { phoneNumber: req.body.phoneNumber },
          ],
          code: otp,
        });
      }
      if (email) {
        await userService.sendOtpByEmail(otp, email);
      }
      await userService.sendOtpBySMS(otp, phoneNumber);
      res.status(200).json({ message: constants.message.otpSent});
    } catch (err: any) {
      res.status(400).json(err.message);
    }
  }

//RESET PASSWORD
async ResetPassword(
  req: Request,
  res: Response,
  // next: NextFunction
) {
  try {
    const { password, confirmPassword } = req.body;
    const token:any= req.headers.authorization;
    const [, payloadBase64] = token.split('.');
    // Decode the payload (second part)
    const decodedPayload = Buffer.from(payloadBase64, 'base64').toString(
      'utf-8',
    );
    // Parse the JSON string into an object
    const payloadObject = JSON.parse(decodedPayload);
    // Extract the user ID
    const userId = payloadObject._id;
    let data = await userModel.findOne({ _id:userId });
    if (!data) {
      return handleErrorResponse(
        res,
        constants.statusCode.notFound,
        constants.message.notExist
      );
    } else {
      if (password == confirmPassword) {
        await userModel.findByIdAndUpdate(
          { _id: data._id },
          { $set: { password: md5(password) } }
        );
        res.status(400).json({message:constants.message.passwordUpdated});
      } else {
        res.status(400).json({message:constants.message.enterSamePassword});
      }
    }
  } catch (err: any) {
    res.status(400).json(err.message);
  }
}

//GET_PROFILE
  async getProfile(req: Request, res: Response) {
    try {
      const newData = await userModel.find();
      res.status(200).json({ data: newData });
    } catch (err) {
      throw err;
    }
  }

//UPDATE PROFILE
async updateProfile(req: Request, res: Response) {
  try {
    const userId =req.params.id;
    const { firstName, lastName, email,phoneNumber, dob, gender } = req.body;
    const dobDate = dob ? moment(dob, 'DD-MM-YYYY').toDate() : undefined;
      const user = await userModel.findOneAndUpdate(
        {_id:userId},
        {$set:{
          firstName,
          lastName,
          phoneNumber,
          dobDate,
          gender
        }}
      )
      handleSuccessResponse(
        res,
        constants.statusCode.success,
        constants.message.updateProfile,
        user,
      );
    }
   catch (err: any) {
    handleErrorResponse(
      res,
      constants.statusCode.internalServerError,
      err.message
    );
  }
}

//LOGOUT
  async signOut(req: Request, res: Response) {
    try {
      const authToken = req.header("Authorization");
      const secret = <string>APP_CONFIG.jwt_secret;
      if (!authToken) {
        return res.status(401).json({ message:constants.message.unauthorized });
      }
      const decodedToken = jwt.verify(authToken, secret) as JwtPayload;
      const userId = decodedToken._id;
      // Clear user session in Redis
      client.del(`user:${userId}`);
      res.status(200).json({ message:constants.message.logout });
    } catch (err) {
      res.status(500).json({ message: constants.message.error});
    }
  }
}
export const userController = new UserController();
