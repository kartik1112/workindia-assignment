import dotenv from "dotenv";
import { createPool } from "mysql2/promise";
import fs from "fs";

dotenv.config();

const db = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const sql = fs.readFileSync("./initializers/database.sql", "utf8"); // Read the file as a string

const sqlStatements = sql.split(";"); // Split into individual SQL statements

for (const statement of sqlStatements) {
  if (statement.trim() !== "") {
    try {
      await db.query(statement);
      console.log("Query executed successfully");
    } catch (err) {
      console.error("Error executing query:", err);
    }
  }
}


export default db;