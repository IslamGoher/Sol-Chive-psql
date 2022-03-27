import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../utils/error-response";
import Joi from "joi";
import { allowedTags } from "../../utils/allowed-tags";

// @route   GET '/api/v1/anonymous/solutions/:email'
export const validateGetAllSolutionsAnonymous = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const joiSchema = Joi.string().email();
    const result = joiSchema.validate(req.params.email);

    if (result.error) return next(new ErrorResponse(400, "invalid email"));

    next();
  } catch (error) {
    next(error);
  }
};

// @route   GET '/api/v1/anonymous/solution/:solutionId'
export const validateSolutionId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const joiSchema = Joi.number().min(1);

    const result = joiSchema.validate(req.params.solutionId);

    if (result.error) return next(new ErrorResponse(400, "invalid id"));

    next();
  } catch (error) {
    next(error);
  }
};

// @route   POST '/api/v1/user/solutions'
export const validateSolution = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const VARCHAR_MAX_LENGTH = 65535;

    const joiSchema = Joi.object({
      title: Joi.string()
        .max(255)
        .required()
        .error(new ErrorResponse(400,
          "it's required to add string title with max length 255"
        )),
      link: Joi.string()
        .uri()
        .required()
        .error(new ErrorResponse(400,
          "it's required to add a valid string URL as 'link'"
        )),
      tags: Joi.array()
        .items(Joi.string().valid(...allowedTags))
        .error(new ErrorResponse(400, "invalid tag")),
      mySolution: Joi.string()
        .max(VARCHAR_MAX_LENGTH)
        .required()
        .error(new ErrorResponse(400,
          "it's required to add a string solution as 'mySolution' with max length 65535"
        )),
      perfectSolution: Joi.string()
        .max(VARCHAR_MAX_LENGTH)
        .error(new ErrorResponse(400,
          "'perfectSolution' must be a string with max length 65535"
        )),
    });

    const result = joiSchema.validate(req.body);

    if (result.error) return next(new ErrorResponse(400, result.error.message));

    next();
  } catch (error) {
    next(error);
  }
};
