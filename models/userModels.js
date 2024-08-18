import pool from "../utils/db.js";

export const createUser = async (userData) => {
  const { name, email, password } = userData;
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, password]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

export const findUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

export const updateUserPassword = async (id, password) => {
  const result = await pool.query(
    "UPDATE users SET password = $1 WHERE id = $2 RETURNING *",
    [password, id]
  );
  return result.rows[0];
};
