import express, { Router } from "express";
import {
  getBasicInfo,
  getFullUserProfile,
  updateAvatar,
  getUserSettings,
  putUserSettings,
  getFullUserProfileForAuth,
} from "../controllers/user";
import {
  validateUserEmail,
  validateUserSettings,
} from "../middlewares/validation/user-validation";
import { authorization } from "../middlewares/authorization";

export const router: Router = express.Router();

// @route   GET '/api/v1/user?email'
// @desc    get full user profile for anonymous user
// @access  public
router.get("/user", validateUserEmail, getFullUserProfile);

// @route   GET '/api/v1/user/profile'
// @desc    get full user profile for authenticated user
// @access  private
router.get("/user/profile", authorization, getFullUserProfileForAuth);

// @route   GET '/api/v1/user/basic-info'
// @desc    get user name and picture
// @access  private
router.get("/user/basic-info", authorization, getBasicInfo);

// @route   PATCH '/api/v1/user/update-avatar'
// @desc    update user avatar
// @access  private
router.patch("/user/update-avatar", authorization, updateAvatar);

// @route   GET '/api/v1/user/settings'
// @desc    get user settings data
// @access  private
router.get("/user/settings", authorization, getUserSettings);

// @route   PUT '/api/v1/user/settings'
// @desc    update user settings data
// @access  private
router.put(
  "/user/settings",
  authorization,
  validateUserSettings,
  putUserSettings
);
