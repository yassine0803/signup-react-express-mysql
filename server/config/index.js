import dotenv from "dotenv";
import mysql from "mysql";
dotenv.config();

export const PORT = process.env.PORT || 5000;

export const baseURL = `http://localhost:${PORT}`;

//create connection
export const sqldb = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
});
