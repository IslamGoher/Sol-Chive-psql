import { Request, Response, NextFunction } from "express";
import { parseCookie } from "../utils/cookie-parser";
import { ErrorResponse } from "../utils/error-response";
import { verify } from "jsonwebtoken";

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = parseCookie(`${req.headers.cookie}`);

    if (!cookies.token)
      return next(
        new ErrorResponse(401, "please login to access this content.")
      );

    const jwtSecret = `${process.env.JWT_SECRET}`;

    const payload: any = verify(cookies.token, jwtSecret);

    req.user = {
      id: payload.id,
    };

    next();
  } catch (error) {
    next(error);
  }
};
