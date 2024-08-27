import pool from "../config/db.js";

export const createTodo = async (todoData) => {
  const { title, description, userId } = todoData;
  const result = await pool.query(
    "INSERT INTO todos (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
    [title, description, userId]
  );
  return result.rows[0];
};

export const getTodosByUserId = async (userId) => {
  const result = await pool.query("SELECT * FROM todos WHERE user_id = $1", [
    userId,
  ]);
  return result.rows;
};

export const updateTodo = async (id, todoData) => {
  const { title, description } = todoData;
  const result = await pool.query(
    "UPDATE todos SET title = $1, description = $2 WHERE id = $3 RETURNING *",
    [title, description, id]
  );
  return result.rows[0];
};

export const deleteTodo = async (id) => {
  const result = await pool.query(
    "DELETE FROM todos WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
