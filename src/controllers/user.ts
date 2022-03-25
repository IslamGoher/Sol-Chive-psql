import { Request, Response, NextFunction } from "express";
import { pool } from "../database/pool";
import { ErrorResponse } from "../utils/error-response";
import { basicInfoQuery, userProfileQueries } from "../queries/api-queries";

// @route   GET '/api/v1/user?email'
// @desc    get full user profile
// @access  public
export const getFullUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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

// @route   GET '/api/v1/user/basic-info'
// @desc    get user name and picture
// @access  private
export const getBasicInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;

    const userData = await pool.query(basicInfoQuery, [userId]);

    res.status(200).json(userData.rows[0]);
  } catch (error) {
    next(error);
  }
};
