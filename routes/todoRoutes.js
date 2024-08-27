import express from "express";
import pool from "../config/db.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new todo
router.post("/", protect, async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTodo = await pool.query(
      "INSERT INTO todos (user_id, title, description) VALUES ($1, $2, $3) RETURNING *",
      [req.user, title, description]
    );

    res.status(201).json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all todos
router.get("/", protect, async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todos WHERE user_id = $1", [
      req.user,
    ]);
    res.status(200).json(todos.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single todo
router.get("/:id", protect, async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await pool.query(
      "SELECT * FROM todos WHERE id = $1 AND user_id = $2",
      [id, req.user]
    );

    if (todo.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a todo
router.put("/:id", protect, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedTodo = await pool.query(
      "UPDATE todos SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, description, id, req.user]
    );

    if (updatedTodo.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a todo
router.delete("/:id", protect, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await pool.query(
      "DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user]
    );

    if (deletedTodo.rows.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
