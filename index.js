const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// TEMP DATA
let students = [
  { id: 1, name: "Arun", dept: "CSE" },
  { id: 2, name: "Priya", dept: "ECE" }
];

// 👉 GET (Read)
app.get("/api/students", (req, res) => {
  res.json(students);
});

// 👉 POST (Create)
app.post("/api/students", (req, res) => {
  const student = {
    id: students.length + 1,
    name: req.body.name,
    dept: req.body.dept
  };
  students.push(student);
  res.status(201).json(student);
});

// 👉 PUT (Update)
app.put("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = req.body.name;
  student.dept = req.body.dept;
  res.json(student);
});

// 👉 DELETE
app.delete("/api/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: "Student deleted" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

