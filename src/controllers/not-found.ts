import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/error-response";

// @route   any
// @desc    send not found response when received request to
//          any url that server not serve
// @access  public
export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return next(new ErrorResponse(404, "url not found"));
};