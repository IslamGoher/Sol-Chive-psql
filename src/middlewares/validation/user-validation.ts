import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../utils/error-response";
import Joi from "joi";

// @route   GET '/api/v1/user?email'
// validate email in query
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

// @route   PUT '/api/v1/user/settings'
export const validateUserSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const joiSchema = Joi.object({
    name: Joi.string()
      .max(255)
      .required()
      .error(new ErrorResponse(400, "it's required to add a string 'name' with max length 255")),
    about: Joi.string()
      .max(5000)
      .error(new ErrorResponse(400, "'about' must be a string with max length 5000")),
    contacts: Joi.string()
      .max(1000)
      .error(new ErrorResponse(400, "'contacts' must be a string with max length 1000"))
  });

  const result = joiSchema.validate(req.body);

  if (result.error)
    return next(new ErrorResponse(400, result.error.message));
    
  next();
};
