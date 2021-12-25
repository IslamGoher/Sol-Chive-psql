// database querie of api "get full user profile"
export const userProfileQueries = `
  SELECT
    name, picture, email, about, contacts,
    COUNT(solution_id) AS problem_count
  FROM
    users, solutions
  WHERE
    users.email = $1 AND solutions.user_id = users.user_id
  GROUP BY
    users.user_id;
`;

// database querie of api "list all solutions for anonymous user"
export const solutionsAnonymousQueries = `
  SELECT
    s.solution_id, s.created_on,
    title , link, source, tags
  FROM
    users as u
  LEFT JOIN solutions as s
  ON s.user_id = u.user_id
  WHERE
    u.email = $1
`;