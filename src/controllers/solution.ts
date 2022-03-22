import { Request, Response, NextFunction } from "express";
import { solutionsAnonymousQueries } from "../queries/api-queries";
import { pool } from "../database/pool";
import { getSortingQuery } from "../utils/sort-database";
import { getFilteringQueries } from "../utils/filter-database";
import { ErrorResponse } from "../utils/error-response";
import { getPaginationQuery } from "../utils/pagination-database";

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
    const page = `${req.query.page}`;

    // sort solutions by date
    const sortBy = getSortingQuery(sortbydate);

    // filter by 'source', 'tag', 'perfect_solution'
    const {
      filterBySource,
      filterByTag,
      filterByPerfectSolution 
    } = getFilteringQueries(source, tag, perfectSolution);

    // pagination
    let pageNumber = parseInt(page);
    if(isNaN(pageNumber))
      pageNumber = 1;

    const SOLUTION_NUMBER_PER_PAGE = 8;
    const pagiantionQuery = getPaginationQuery(pageNumber, SOLUTION_NUMBER_PER_PAGE);
    
    // list solutions from database
    const solutionsData = await pool.query(
      `${solutionsAnonymousQueries.solutions}
      ${filterBySource}
      ${filterByTag}
      ${filterByPerfectSolution!}
      ${sortBy}
      ${pagiantionQuery};`,
      [email]
    );

    if(solutionsData.rowCount === 0)
      return next(new ErrorResponse(404, "solutions not found"));

    // find solution count
    const solutionCountData = await pool.query(
      `${solutionsAnonymousQueries.solutionCount}
      ${filterBySource}
      ${filterByTag}
      ${filterByPerfectSolution!}
      GROUP BY s.solution_id) AS t;
      `,
      [email]
    );
    const solutionCount = solutionCountData.rows[0].count;
    const totalPages = Math.ceil(solutionCount / SOLUTION_NUMBER_PER_PAGE);

    res.json({
      pageNumber,
      totalPages,
      count: solutionsData.rowCount,
      solutions: solutionsData.rows
    });

  } catch (error) {
    next(error);
  }
};