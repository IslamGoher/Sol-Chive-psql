// database queries of api get full user profile
export const userProfileQueries = {
  userData: `
    SELECT
      user_id, name, picture, email, about, contacts
    FROM
      users
    WHERE
      email = $1;
  `,
  problemCount: `
    SELECT
      COUNT(solution_id)
    FROM
      solutions
    WHERE
      user_id = $1
  `,
};
