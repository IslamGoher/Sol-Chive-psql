import { Request, Response, NextFunction } from "express";
import { pool } from "../database/pool";
import { ErrorResponse } from "../utils/error-response";
import { userProfileQueries } from "../queries/api-queries";

// @route   GET '/api/v1/user?email'
// @desc    get full user profile
// @access  public
export const getFullUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // check if user enter email
    if (!req.query.email) {
      return next(new ErrorResponse(400, "please enter email"));
    }

    // get user data
    const userData = await pool.query(userProfileQueries, [req.query.email]);

    // check if email matches
    if (userData.rowCount === 0) {
      return next(
        new ErrorResponse(404, "there's no such user with given email")
      );
    }

    // send response
    res.status(200).json(userData.rows[0]);
  } catch (error) {
    next(error);
  }
};
