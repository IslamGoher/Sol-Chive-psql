import express, { Router } from "express";
import {
  getGoogleAuth,
  getGoogleCallback,
  logout
} from "../controllers/auth";
import { authorization } from "../middlewares/authorization";

export const router: Router = express.Router();

// @route   GET '/api/v1/auth/google'
// @desc    generate google oauth url
// @access  public
router.get("/google", getGoogleAuth);

// @route   GET '/api/v1/auth/google/callback'
// @desc    google oauth redirection url
// @access  public
router.get("/google/callback", getGoogleCallback);

// @route   DELETE '/api/v1/auth/logout'
// @desc    logout
// @access  private (only logged in user can logout)
router.delete("/logout", authorization, logout);
