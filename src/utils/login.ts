import { sign, SignOptions } from "jsonwebtoken";
import { Response } from "express";

export function login(payload: any, res: Response) {
  // create jwt
  const secret = `${process.env.JWT_SECRET}`;
  const MONTH_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 30;

  const cookieOptions = {
    httpOnly: true,
    maxAge: Date.now() + MONTH_IN_MILLISECONDS,
  };

  const signOptions: SignOptions = {
    algorithm: "HS256",
    expiresIn: "30 days",
  };

  const token = sign(payload, secret, signOptions);

  // store jwt in cookies
  res.cookie("token", token, cookieOptions);
}
