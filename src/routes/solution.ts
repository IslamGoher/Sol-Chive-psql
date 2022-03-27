import express, { Router } from "express";
import {
  getAllSolutionsAnonymous,
  getOneSolutionAnonymous,
  getAllSolutionsAuth,
  getOneSolutionAuth,
  deleteSolution,
  addSolution,
} from "../controllers/solution";
import {
  validateGetAllSolutionsAnonymous,
  validateSolutionId,
} from "../middlewares/validation/solution-validation";
import { authorization } from "../middlewares/authorization";

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
router.get(
  "/anonymous/solution/:solutionId",
  validateSolutionId,
  getOneSolutionAnonymous
);

// @route   GET '/api/v1/user/solutions'
// @desc    list all solution for authenticated user
// @access  private
router.get("/user/solutions", authorization, getAllSolutionsAuth);

// @route   GET '/api/v1/user/solutions/:solutionId'
// @desc    list one solution for authenticated user
// @access  private
router.get(
  "/user/solutions/:solutionId",
  authorization,
  validateSolutionId,
  getOneSolutionAuth
);

// @route   DELETE '/api/v1/user/solutions/:solutionId'
// @desc    delete one solution for authenticated user
// @access  private
router.delete(
  "/user/solutions/:solutionId",
  authorization,
  validateSolutionId,
  deleteSolution
);

// @route   POST '/api/v1/user/solutions'
// @desc    create new solution
// @access  private
router.post("/user/solutions", authorization, addSolution);
