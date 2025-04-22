import { useEffect, useState } from "react";
import React from "react";
import axios from "../axios";
import Taskform from "./components/Taskform";
import TaskList from "./components/TaskList";
import "./App.css";
import "./styles/tasklist.css";
import "./styles/taskform.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // added error and loading state for better user experience

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to fetch tasks. Please check if the server is running.");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (editId) {
        await axios.put(`/tasks/${editId}`, { text });
        setEditId(null);
      } else {
        await axios.post("/tasks/post", { text });
      }
      setText("");
      fetchTasks();
    } catch (err) {
      console.error("Error saving task:", err);
      setError("Failed to save task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setText(task.text);
    setEditId(task._id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Mini Task Manager</h1>

      {error && <div className="error-message">{error}</div>}
      {/* MOVED  BELOW CODE TO SEPERATE COMPOP */}
      {/* {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className="task-item">
            <div className="task-text">{task.text}</div>
            <div className="task-actions">
              <button className="edit-btn" onClick={() => handleedit(task)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handledelete(task._id)}
              >
                Delete
              </button>
            </div>
          </div> */}
      <Taskform
        text={text}
        settext={setText}
        handlesubmit={handleSubmit}
        editId={editId}
        loading={loading}
      />

      {loading && <p className="loading">Loading...</p>}

      <TaskList
        tasks={tasks}
        handleedit={handleEdit}
        handledelete={handleDelete}
      />
    </div>
  );
}

export default App;
