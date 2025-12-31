const express = require("express");
const router = express.Router();

// Temporary in-memory data
let tasks = [
  { id: 1, title: "Create Dashboard", status: "pending" },
  { id: 2, title: "Build Backend", status: "completed" }
];

// ✅ GET all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// ✅ POST create new task
router.post("/", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    status: req.body.status
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ✅ PUT update task
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = req.body.title;
  task.status = req.body.status;

  res.json(task);
});

// ✅ DELETE task
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: "Task deleted successfully" });
});

module.exports = router;
