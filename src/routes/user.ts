import express, { Router } from "express";
import {
  getBasicInfo,
  getFullUserProfile,
  updateAvatar,
} from "../controllers/user";
import { validateUserEmail } from "../middlewares/validation/user-validation";
import { authorization } from "../middlewares/authorization";

export const router: Router = express.Router();

// @route   GET '/api/v1/user?email'
// @desc    get full user profile
// @access  public
router.get("/user", validateUserEmail, getFullUserProfile);

// @route   GET '/api/v1/user/basic-info'
// @desc    get user name and picture
// @access  private
router.get("/user/basic-info", authorization, getBasicInfo);

// @route   PATCH '/api/v1/user/update-avatar'
// @desc    update user avatar
// @access  private
router.patch("/user/update-avatar", authorization, updateAvatar);
