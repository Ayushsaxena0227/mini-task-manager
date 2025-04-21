const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/Taskmodel");
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(`mongodb://localhost:2701/taskmanager`)
  .then(() => console.log("mongodb connected"));
// .catch(err=> console.log(err));

// routes
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
});

app.post("/tasks", async (req, res) => {
  const newtask = new Task(req.body);
  await newtask.save();
  res.status(201).json(newtask);
});

app.put("/tasks/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task delete" });
});

app.listen(3000, () => console.log("server running"));
