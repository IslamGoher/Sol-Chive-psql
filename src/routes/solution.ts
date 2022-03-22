import express, { Router } from "express";
import { getAllSolutionsAnonymous } from "../controllers/solution";

export const router: Router = express.Router();

// @route   GET '/api/v1/solutions/:email'
// @desc    list all solutions for Anonymous user
// @access  public
router.get("/api/v1/solutions/:email", getAllSolutionsAnonymous);