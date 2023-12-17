import nodemailer from "nodemailer";
import dotenv from "dotenv";
import twilio from "twilio";
import { APP_CONFIG } from "../constants/constant";
const phoneNumberUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const PhoneNumberFormat = require('google-libphonenumber').PhoneNumberFormat;

// Your Twilio credentials
const accountSid = APP_CONFIG.accountSid;
const authToken = APP_CONFIG.authToken
const twilioClient = twilio(accountSid, authToken);
dotenv.config();

const user = String(process.env.EMAIL);
const pass = String(process.env.PASSWORD);

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

class userServiceClass {
  //send email
  async sendEmail(email: any, link: any) {
    try {
      const mail = await transporter.sendMail({
        from: user,
        to: email.email,
        subject: "Link for Mail verification is:",
        html:
          "Hello,<br> Please Click on the link to verify your email.<br><a href=" +
          link +
          ">Click here to verify</a>",
      });
      console.log("email sent sucessfully");
      return Promise.resolve(mail);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  //   async sendOtpByEmail(otp: any, email: any) {
  //     try {
  //       var mailOptions = {
  //         to: email,
  //         subject: "Otp for verification is: ",
  //         html:
  //           "<h3>OTP for Reset yor password</h3>" +
  //           "<h1 style='font-weight:bold;'>" +
  //           otp +
  //           "</h1>", // html body
  //       };
  //       transporter.sendMail(mailOptions, (error: any, info: any) => {
  //         if (error) {
  //           console.log(error);
  //           Promise.reject(error);
  //         }

  //         Promise.resolve(otp);
  //       });
  //     } catch (err: any) {
  //       console.log(err);
  //       return err;
  //     }
  //   }
  async sendOtpByEmail(otp: number, email: string): Promise<any> {
    try {
      const mailOptions = {
        to: email,
        subject: "Otp for verification is: ",
        html: `<h3>OTP for Reset your password</h3><h1 style='font-weight:bold;'>${otp}</h1>`,
      };
      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      return otp;
    } catch (err: any) {
      console.error("Error sending OTP email:", err.message);
      throw err;
    }
  }

  // Function to send OTP via SMS
  async sendOtpBySMS(otp: any, phoneNumber: any) {
    console.log(phoneNumber);
    try {
    // Parse and format the phone number
    const parsedPhoneNumber = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, '91'); // Change 'IN' to the appropriate country code
    const formattedPhoneNumber = phoneNumberUtil.format(parsedPhoneNumber, PhoneNumberFormat.E164);
    console.log(formattedPhoneNumber)
      const message = await twilioClient.messages.create({
        body: `Your OTP is: ${otp}`,
        from:'+17632735566',
        to: formattedPhoneNumber,
      });
      console.log(`OTP sent successfully: ${message.sid}`);
      return true;
    } catch (error: any) {
      console.error("Error sending OTP via SMS:", error.message);
      return false;
    }
  }
}
export const userService = new userServiceClass();
