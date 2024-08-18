import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); 

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool
  .connect()
  .then(() => console.log("Connected to the PostgreSQL database"))
  .catch((err) =>
    console.error("Error connecting to the PostgreSQL database:", err)
  );

export default pool;
