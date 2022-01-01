import { Request, Response, NextFunction } from "express";
import { solutionsAnonymousQueries } from "../queries/api-queries";
import { pool } from "../database/pool";
import { getSortingQuery } from "../utils/sort-database";
import { getFilteringQueries } from "../utils/filter-database";
import { ErrorResponse } from "../utils/error-response";

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
    const sortbydate = `${req.query.sortbydate}`;
    const source = `${req.query.source}`;
    const tag = `${req.query.tag}`;
    const perfectSolution = `${req.query.perfectsolution}`;

    // sort solutions by date
    const sortBy = getSortingQuery(sortbydate);

    // filter by 'source', 'tag', 'perfect_solution'
    const {
      filterBySource,
      filterByTag,
      filterByPerfectSolution 
    } = getFilteringQueries(source, tag, perfectSolution);
    
    const solutionsData = await pool.query(
      `${solutionsAnonymousQueries}
      ${filterBySource}
      ${filterByTag}
      ${filterByPerfectSolution!}
      ${sortBy};`,
      [email]
    );

    if(solutionsData.rowCount === 0)
      return next(new ErrorResponse(404, "solutions not found"));

    res.json(solutionsData.rows);

  } catch (error) {
    next(error);
  }
};