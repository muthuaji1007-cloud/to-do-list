const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Read tasks from tasks.json
const readTasks = () => {
  const data = fs.readFileSync("tasks.json");
  return JSON.parse(data);
};

// Write tasks to tasks.json
const writeTasks = (tasks) => {
  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
};

// GET all tasks
app.get("/tasks", (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// POST new task
app.post("/tasks", (req, res) => {
  const { title, priority } = req.body;
  if (!title || !priority) {
    return res.status(400).json({ error: "Title and priority are required" });
  }

  const tasks = readTasks();
  const newTask = {
    id: uuidv4(),
    title,
    completed: false,
    priority,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// PUT update task (mark complete/incomplete)
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) return res.status(404).json({ error: "Task not found" });

  task.completed = !task.completed;
  writeTasks(tasks);
  res.json(task);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  let tasks = readTasks();
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) return res.status(404).json({ error: "Task not found" });

  tasks.splice(taskIndex, 1);
  writeTasks(tasks);
  res.json({ message: "Task deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
