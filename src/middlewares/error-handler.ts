import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

interface ErrorHandler extends ErrorRequestHandler {
  message: string,
  code: number,
  kind: string
}

export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  
  // console.log(err);

  res.status(err.code || 500).json({
    code: err.code || 500,
    message: err.message || "Server error"
  });  
};
