import { Request, Response, NextFunction } from "express";
import { pool } from "../database/pool";
import { ErrorResponse } from "../utils/error-response";
import {
  basicInfoQuery,
  queryToGetRefreshToken,
  queryToUpdateAvatar,
  userProfileQueries,
  userSettingsQuery,
  queryToUpdateUserSettings,
} from "../queries/api-queries";
import { getAccessToken } from "../utils/get-access-token";
import { getAvatarUrl } from "../utils/get-avatar-url";

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
    const userData = await pool.query(userProfileQueries.userData, [
      req.query.email
    ]);

    // check if email matches
    if (userData.rowCount === 0) {
      return next(
        new ErrorResponse(404, "there's no such user with given email")
      );
    }

    // get problem count of user
    const solutionCount = await pool.query(userProfileQueries.solutionCount, [
      req.query.email
    ]);

    if (solutionCount.rowCount === 0)
      solutionCount.rows[0] = { problem_count: 0 };

    userData.rows[0].problem_count = solutionCount.rows[0].problem_count;

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

// @route   PATCH '/api/v1/user/update-avatar'
// @desc    update user avatar
// @access  private
export const updateAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const userId = req.user.id;

    const OauthData = await pool.query(queryToGetRefreshToken, [userId]);

    const refreshToken = OauthData.rows[0].refresh_token;
    const loginWebsite = OauthData.rows[0].login_website;

    const accessToken = await getAccessToken(refreshToken, loginWebsite);
    
    const newAvatar = await getAvatarUrl(`${accessToken}`, loginWebsite);

    await pool.query(queryToUpdateAvatar, [newAvatar, userId]);

    res.status(200).json({
      picture: newAvatar
    });
    
  } catch (error) {
    next(error);
  }
};

// @route   GET '/api/v1/user/settings'
// @desc    get user settings data
// @access  private
export const getUserSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;

    const userData = await pool.query(userSettingsQuery, [userId]);

    res.status(200).json(userData.rows[0]);
    
  } catch (error) {
    next(error);
  }
};

// @route   PUT '/api/v1/user/settings'
// @desc    update user settings data
// @access  private
export const putUserSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const userId = req.user.id;
    const name = req.body.name;
    const about = req.body.about || "";
    const contacts = req.body.contacts || "";

    await pool.query(queryToUpdateUserSettings, [
      name,
      about,
      contacts,
      userId
    ]);

    res.status(200).json({
      code: 200,
      message: "user data updated successfully"
    });
    
  } catch (error) {
    next(error);
  }
};
