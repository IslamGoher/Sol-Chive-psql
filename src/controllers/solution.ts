import { Request, Response, NextFunction } from "express";
import {
  oneSolutionAnonymousQuery,
  solutionsAnonymousQueries,
  SolutionsAuthQueries,
  oneSolutionAuthQuery,
  queryToDeleteSolution,
  queryToAddSolution,
  queryToUpdateSolution
} from "../queries/api-queries";
import { pool } from "../database/pool";
import { getSortingQuery } from "../utils/sort-database";
import { getFilteringQueries } from "../utils/filter-database";
import { ErrorResponse } from "../utils/error-response";
import { getPaginationQuery } from "../utils/pagination-database";
import { extractDomain } from "../utils/extract-source";

// @route   GET '/api/v1/anonymous/solutions/:email'
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
    const page = `${req.query.page}`;

    // sort solutions by date
    const sortBy = getSortingQuery(sortbydate);

    // filter by 'source', 'tag', 'perfect_solution'
    const {
      filterBySource,
      filterByTag
    } = getFilteringQueries(source, tag, "");

    // pagination
    let pageNumber = parseInt(page);
    if(isNaN(pageNumber) || pageNumber < 1)
      pageNumber = 1;

    const SOLUTION_NUMBER_PER_PAGE = 24;
    const pagiantionQuery = getPaginationQuery(pageNumber, SOLUTION_NUMBER_PER_PAGE);
    
    // list solutions from database
    const solutionsData = await pool.query(
      `${solutionsAnonymousQueries.solutions}
      ${filterBySource}
      ${filterByTag}
      ${sortBy}
      ${pagiantionQuery};`,
      [email]
    );

    if(solutionsData.rowCount === 0)
      return next(new ErrorResponse(404, "solutions not found"));

    // find solutions count
    const solutionCountData = await pool.query(
      `${solutionsAnonymousQueries.solutionCount}
      ${filterBySource}
      ${filterByTag}
      GROUP BY s.solution_id) AS t;
      `,
      [email]
    );
    const solutionCount = solutionCountData.rows[0].count;
    const totalPages = Math.ceil(solutionCount / SOLUTION_NUMBER_PER_PAGE);

    res.status(200).json({
      pageNumber,
      totalPages,
      count: solutionsData.rowCount,
      solutions: solutionsData.rows
    });

  } catch (error) {
    next(error);
  }
};

// @route   GET '/api/v1/anonymous/solution/:solutionId'
// @desc    list one solution for Anonymous user
// @access  public
export const getOneSolutionAnonymous = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const solutionId = req.params.solutionId;

    const solutionData = await pool.query(oneSolutionAnonymousQuery, [
      solutionId
    ]);

    if (solutionData.rowCount === 0)
      return next(new ErrorResponse(404, "there's no solution found with given id"));

    res.status(200).json(solutionData.rows[0]);

  } catch (error) {
    next(error);
  }
};

// @route   GET '/api/v1/user/solutions'
// @desc    list all solution for authenticated user
// @access  private
export const getAllSolutionsAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const userId = req.user.id;
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
    if(isNaN(pageNumber) || pageNumber < 1)
      pageNumber = 1;

    const SOLUTION_NUMBER_PER_PAGE = 24;
    const pagiantionQuery = getPaginationQuery(pageNumber, SOLUTION_NUMBER_PER_PAGE);

    const solutionsData = await pool.query(
      `${SolutionsAuthQueries.solutions}
      ${filterBySource}
      ${filterByTag}
      ${filterByPerfectSolution!}
      ${sortBy}
      ${pagiantionQuery};`,
      [userId]
    );

    if (solutionsData.rowCount === 0)
      return next(new ErrorResponse(404, "there's no solution found"));

    // find solutions count
    const solutionCountData = await pool.query(
      `${SolutionsAuthQueries.solutionsCount}
      ${filterBySource}
      ${filterByTag}
      ${filterByPerfectSolution!}
      GROUP BY solution_id) AS t;
      `,
      [userId]
    );
    const solutionCount = solutionCountData.rows[0].count;
    const totalPages = Math.ceil(solutionCount / SOLUTION_NUMBER_PER_PAGE);

    res.status(200).json({
      pageNumber,
      totalPages,
      count: solutionsData.rowCount,
      solutions: solutionsData.rows
    });

  } catch (error) {
    next(error);
  }
};

// @route   GET '/api/v1/user/solutions/:solutionId'
// @desc    list one solution for authenticated user
// @access  private
export const getOneSolutionAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const userId = req.user.id;
    const solutionId = req.params.solutionId;

    const solutionData = await pool.query(
      oneSolutionAuthQuery,
      [solutionId, userId]
    );

    if (solutionData.rowCount === 0)
      return next(new ErrorResponse(404, "there's no solution with given id"));

    res.status(200).json(solutionData.rows[0]);

  } catch (error) {
    next(error);
  }
};

// @route   DELETE '/api/v1/user/solutions/:solutionId'
// @desc    delete one solution for authenticated user
// @access  private
export const deleteSolution = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const solutionId = req.params.solutionId;
    const userId = req.user.id;

    const data = await pool.query(
      queryToDeleteSolution,
      [solutionId, userId]
    );
    
    const errorMassage = "there's no solution found with gevin id";

    if (data.rowCount === 0)
      return next(new ErrorResponse(404, errorMassage));
    
    res.status(200).json({
      code: 200,
      message: `solution with id: ${solutionId} deleted successfully.`
    });
    
  } catch (error) {
    next(error);
  }
};

// @route   POST '/api/v1/user/solutions'
// @desc    create new solution
// @access  private
export const addSolution = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const userId = req.user.id;
    const title = req.body.title;
    const link = req.body.link;
    const mySolution = req.body.mySolution;
    const perfectSolution = req.body.perfectSolution || null;
    
    const tags: string[] = req.body.tags || [];
    const tagsInQuery = `{ ${tags.join(", ")} }`;

    const source = extractDomain(link);

    const solutionData = await pool.query(queryToAddSolution, [
      title,
      link,
      source,
      mySolution,
      perfectSolution,
      tagsInQuery,
      userId
    ]);

    res.status(201).json({
      code: 201,
      message: "solution created successfully",
      solutionId: solutionData.rows[0].solution_id
    });
    
  } catch (error) {
    next(error);
  }
};

// @route   PUT '/api/v1/user/solutions/:solutionId'
// @desc    update solution for authenticated user
// @access  private
export const updateSolution = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const solutionId = req.params.solutionId;
    const userId = req.user.id;
    const title = req.body.title;
    const link = req.body.link;
    const mySolution = req.body.mySolution;
    const perfectSolution = req.body.perfectSolution || "";
    
    const tags: string[] = req.body.tags || [];
    const tagsInQuery = `{ ${tags.join(", ")} }`;

    const source = extractDomain(link);

    const solutionData = await pool.query(queryToUpdateSolution, [
      title,
      link,
      source,
      mySolution,
      perfectSolution,
      tagsInQuery,
      userId,
      solutionId
    ]);

    if (solutionData.rowCount === 0)
      return next(new ErrorResponse(404, "there's no solution found with given id"));

    res.status(200).json({
      code: 200,
      message: "solution updated successfully",
      solutionId: solutionData.rows[0].solution_id
    });
    
  } catch (error) {
    next(error);
  }
};
