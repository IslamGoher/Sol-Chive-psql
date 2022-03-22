import express, { Router } from "express";
import {
  getAllSolutionsAnonymous,
  getOneSolutionAnonymous,
} from "../controllers/solution";
import { validateGetAllSolutionsAnonymous } from "../middlewares/validation/solution-validation";

export const router: Router = express.Router();

// @route   GET '/api/v1/anonymous/solutions/:email'
// @desc    list all solutions for Anonymous user
// @access  public
router.get(
  "/anonymous/solutions/:email",
  validateGetAllSolutionsAnonymous,
  getAllSolutionsAnonymous
);

// @route   GET '/api/v1/anonymous/solution/:solutionId'
// @desc    list one solution for Anonymous user
// @access  public
router.get("/anonymous/solution/:solutionId", getOneSolutionAnonymous);
