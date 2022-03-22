import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../utils/error-response";
import Joi from "joi";

// @route   GET '/api/v1/anonymous/solutions/:email'
export const validateGetAllSolutionsAnonymous = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const joiSchema = Joi.string().email();
  const result = joiSchema.validate(req.params.email);

  if(result.error)
    return next(new ErrorResponse(400, "invalid email"));

  next();
};
