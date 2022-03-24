import { Request, Response, NextFunction } from "express";
import { google } from "googleapis";
import axios from "axios";
import { pool } from "../database/pool";
import { findUser, updateRefreshToken, addUser } from "../queries/api-queries";
import { login } from "../utils/login";

// @route   GET '/api/v1/auth/google'
// @desc    generate google oauth url
// @access  public
export const getGoogleAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const oauth2Client = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
    });

    // determine the scope of google Oauth
    // in other words: which data we need from google
    const scope = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope,
    });

    res.status(200).json({
      redirectUrl: url,
    });
  } catch (error) {
    next(error);
  }
};

// @route   GET '/api/v1/auth/google/callback'
// @desc    google oauth redirection url
// @access  public
export const getGoogleCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const oauth2Client = new google.auth.OAuth2({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
    });

    const callbackCode = `${req.query.code}`;

    const { tokens } = await oauth2Client.getToken(callbackCode);

    const googleOauthUrl = `${process.env.GOOGLE_ACCESS_TOKEN_URL}${tokens.access_token}`;

    const { data } = await axios.get(googleOauthUrl);

    // find user
    const userData = await pool.query(findUser, [data.email]);

    if (userData.rowCount > 0) {
      const userId = userData.rows[0].user_id;

      // update refresh token
      await pool.query(updateRefreshToken, [
        "google",
        tokens.refresh_token,
        userId,
      ]);

      // login
      login({ id: userId }, res);
    } else {
      // create user
      const userId = await pool.query(addUser, [
        data.name,
        data.picture,
        data.email,
        "google",
        tokens.refresh_token,
      ]);

      // login
      login({ id: userId.rows[0].user_id }, res);
    }

    res.status(200).json({
      code: 200,
      message: "user logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @route   DELETE '/api/v1/auth/logout'
// @desc    logout
// @access  private (only logged in user can logout)
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("token");
    res.status(204).end();

  } catch (error) {
    next(error);
  }
};
