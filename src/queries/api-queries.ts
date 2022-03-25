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
export const solutionsAnonymousQueries = {
  solutions: `
    SELECT
      s.solution_id, s.created_on,
      title , link, source, tags
    FROM
      users as u
    LEFT JOIN solutions as s
    ON s.user_id = u.user_id
    WHERE
      u.email = $1
  `,
  solutionCount: `
    SELECT
      COUNT(t)
    FROM
      (
        SELECT
          s.solution_id 
        FROM
          users as u
        LEFT JOIN solutions as s
        ON s.user_id = u.user_id
        WHERE
          u.email = $1
        
  `,
};

export const getSolutionAnonymousQuery = `
  SELECT
    solution_id, created_on,
    title, link, source,
    tags, my_solution
  FROM
    solutions
  WHERE
    solution_id = $1;
`;

export const findUser = `
  SELECT
    user_id
  FROM
    users
  WHERE
    email = $1;
`;

export const updateRefreshToken = `
  UPDATE
    users
  SET
    login_website = $1,
    refresh_token = $2
  WHERE
    user_id = $3;
`;

export const addUser = `
  INSERT INTO
    users (
      name, picture, email,
      login_website, refresh_token
    )
    VALUES ($1, $2, $3, $4, $5)
  RETURNING user_id;
`;

export const getAllSolutionsAuthQueries = {
  solutions: `
    SELECT
      solution_id, created_on, title,
      link, source, tags,
      CASE
        WHEN EXISTS (
          SELECT
            *
          FROM
            solutions AS u
          WHERE
            perfect_solution IS NOT NULL AND
            u.solution_id = s.solution_id
        )
        THEN true
        ELSE false
      END AS perfect_solution
    FROM
      solutions AS s
    WHERE
      user_id = $1
  `,
  solutionsCount: `
  SELECT
    COUNT(t)
  FROM
    (
      SELECT
        solution_id
      FROM
        solutions as s
      WHERE
        user_id = $1
  `
};

export const getOneSolutionAuthQuery = `
  SELECT
    solution_id, created_on,
    title, link, source, tags,
    my_solution, perfect_solution
  FROM
    solutions
  WHERE
    solution_id = $1 AND
    user_id = $2;
`;

export const deleteSolutionQuery = `
  DELETE FROM
    solutions
  WHERE
    solution_id = $1 AND
    user_id = $2
  RETURNING solution_id;
`;

export const basicInfoQuery = `
  SELECT
    name, picture
  FROM
    users
  WHERE
    user_id = $1;
`;

export const getRefreshToken = `
  SELECT
    refresh_token, login_website
  FROM
    users
  WHERE
    user_id = $1;
`;

export const updateAvatarQuery = `
  UPDATE
    users
  SET
    picture = $1
  WHERE
    user_id = $2;
`;
