import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/error-response";
import Joi from "joi";

// @route   GET '/api/v1/user?email'
export const validateUserEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.email)
    return next(new ErrorResponse(400, "please enter email"));

  const joiSchema = Joi.string().email();
  let result = joiSchema.validate(req.query.email);
  
  if (result.error)
    return next(new ErrorResponse(400, "invalid email"));
  
  next();
};
