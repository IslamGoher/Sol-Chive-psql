import { Request, Response, NextFunction } from "express";
import { google } from "googleapis";
import axios from "axios";
import { pool } from "../database/pool";

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
