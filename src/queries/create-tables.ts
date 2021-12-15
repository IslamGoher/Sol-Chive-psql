import { pool } from "../database/pool";

// create tables
export async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR (255) NOT NULL,
        picture VARCHAR (1000),
        email VARCHAR (255) UNIQUE NOT NULL,
        about VARCHAR (5000),
        contacts VARCHAR (1000)
      );
  
      CREATE TABLE IF NOT EXISTS solutions(
        solution_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        created_on TIMESTAMP NOT NULL,
        title VARCHAR (255) NOT NULL,
        link VARCHAR (1000) NOT NULL,
        source VARCHAR (255) NOT NULL,
        my_solution VARCHAR NOT NULL,
        perfect_solution VARCHAR,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS solution_tag(
        solution_tag_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        solution_id INT REFERENCES solutions(solution_id) ON DELETE CASCADE,
        tag VARCHAR (255) NOT NULL
      );
    `);
  
    // eslint-disable-next-line no-console
    console.log("database tables created");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    
  }
  
}