import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { APP_CONFIG } from "../constants/constant";
import { client } from "../services/database/redis";
export default async function verifytoken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const secret = <string>APP_CONFIG.jwt_secret;
    const token: string | undefined = req.headers.authorization;
    if (!token) {
      res.status(400).json("Token required for login");
    } else {
      let data: any = jwt.verify(token, secret);
      req.body.token = data._id;
      const userId = data._id;
      const checkSession = await client.hget(`user:${userId}`, '_id');
      if (!checkSession) {
      return res.status(400).json("Invalid session. Please log in again.");
    }
    next();
    }
  } catch (err) {
    res.status(400).json("Invalid token login again");
  }
}

