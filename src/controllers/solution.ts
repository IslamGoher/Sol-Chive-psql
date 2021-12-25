import { Request, Response, NextFunction } from "express";
import { solutionsAnonymousQueries } from "../queries/api-queries";
import { pool } from "../database/pool";
import { getSortingQuery } from "../utils/sort-database";

// @route   GET '/api/v1/solutions/:email'
// @desc    list all solutions for Anonymous user
// @access  public
export const getAllSolutionsAnonymous = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const email = req.params.email;

    // sort solutions by date
    let sortBy = getSortingQuery(`${req.query.sort}`);

    const solutionsData = await pool.query(
      `${solutionsAnonymousQueries} ${sortBy};`,
      [email]
    );

    res.json(solutionsData.rows);

  } catch (error) {
    next(error);
  }
};