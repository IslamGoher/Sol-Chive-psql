import express, { Router } from "express";
import { getGoogleAuth } from "../controllers/auth";

export const router: Router = express.Router();

// @route   GET '/api/v1/auth/google'
// @desc    generate google oauth url
// @access  public
router.get("/google", getGoogleAuth);
