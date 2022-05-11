// database querie of api "get full user profile"
export const userProfileQueries = {
  userData: `
  SELECT
    name, picture, email, about, contacts
  FROM
    users
  WHERE
    users.email = $1;
  `,
  solutionCount: `
    SELECT 
      COUNT(solution_id) AS problem_count
    FROM
      solutions, users
    WHERE
      users.email  = $1 AND
      users.user_id = solutions.user_id
    GROUP BY users.user_id;
  `
};

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
      u.email = $1 AND
      s.solution_id IS NOT NULL
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

// database query to list one solution for Anonymous user
export const oneSolutionAnonymousQuery = `
  SELECT
    solution_id, created_on,
    title, link, source,
    tags, my_solution
  FROM
    solutions
  WHERE
    solution_id = $1;
`;

export const queryToFindUser = `
  SELECT
    user_id
  FROM
    users
  WHERE
    email = $1;
`;

export const queryToUpdateRefreshToken = `
  UPDATE
    users
  SET
    login_website = $1,
    refresh_token = $2
  WHERE
    user_id = $3;
`;

export const QueryToAddUser = `
  INSERT INTO
    users (
      name, picture, email,
      login_website, refresh_token
    )
    VALUES ($1, $2, $3, $4, $5)
  RETURNING user_id;
`;

export const SolutionsAuthQueries = {
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

export const oneSolutionAuthQuery = `
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

export const queryToDeleteSolution = `
  DELETE FROM
    solutions
  WHERE
    solution_id = $1 AND
    user_id = $2
  RETURNING solution_id;
`;

export const basicInfoQuery = `
  SELECT
    name, picture, email
  FROM
    users
  WHERE
    user_id = $1;
`;

export const queryToGetRefreshToken = `
  SELECT
    refresh_token, login_website
  FROM
    users
  WHERE
    user_id = $1;
`;

export const queryToUpdateAvatar = `
  UPDATE
    users
  SET
    picture = $1
  WHERE
    user_id = $2;
`;

export const queryToAddSolution = `
  INSERT INTO
    solutions(
      created_on, title,
      link, source, my_solution,
      perfect_solution, tags, user_id
    )

    VALUES(
      NOW(), $1,
      $2, $3, $4,
      $5, $6, $7
    )
    RETURNING
      solution_id;
`;

export const queryToUpdateSolution = `
  UPDATE
    solutions
  SET
    title = $1,
    link = $2, 
    source = $3, 
    my_solution = $4,
    perfect_solution = $5,
    tags = $6
  WHERE
    user_id = $7 AND
    solution_id = $8
  RETURNING
    solution_id;
`;

export const userSettingsQuery = `
  SELECT
    name, about, contacts
  FROM
    users
  WHERE
    user_id = $1;
`;

export const queryToUpdateUserSettings = `
  UPDATE
    users
  SET
    name = $1,
    about = $2,
    contacts = $3
  WHERE
    user_id = $4;
`;
