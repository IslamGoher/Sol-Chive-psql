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
