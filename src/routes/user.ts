import express, { Router } from "express";
import { getFullUserProfile } from "../controllers/user";
import { validateUserEmail } from "../middlewares/validation/user-validation";

export const router: Router = express.Router();

// @route   GET '/api/v1/user?email'
// @desc    get full user profile
// @access  public
router.get("/user", validateUserEmail, getFullUserProfile);