import {
  createTodo,
  getTodosByUserId,
  updateTodo,
  deleteTodo,
} from "../models/todoModel.js";

export const createTodoItem = async (req, res) => {
  const todo = await createTodo({
    title: req.body.title,
    description: req.body.description,
    userId: req.user.id,
  });
  res.status(201).json({ todo });
};

export const getTodos = async (req, res) => {
  const todos = await getTodosByUserId(req.user.id);
  res.status(200).json({ todos });
};

export const updateTodoItem = async (req, res) => {
  const { id } = req.params;
  const updatedTodo = await updateTodo(id, req.body);
  res.status(200).json({ updatedTodo });
};

export const deleteTodoItem = async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await deleteTodo(id);
  res.status(200).json({ deletedTodo });
};
