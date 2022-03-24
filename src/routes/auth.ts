import express, { Router } from "express";
import {
  getGoogleAuth,
  getGoogleCallback
} from "../controllers/auth";

export const router: Router = express.Router();

// @route   GET '/api/v1/auth/google'
// @desc    generate google oauth url
// @access  public
router.get("/google", getGoogleAuth);

// @route   GET '/api/v1/auth/google/callback'
// @desc    google oauth redirection url
// @access  public
router.get("/google/callback", getGoogleCallback);