import { use, useEffect, useState } from "react";
import React from "react";
function App() {
  const [tasks, settask] = useState([]);
  const [text, settext] = useState("");
  const [editId, setisEditId] = useState(null);
  const saved = localStorage.getItem("tasks");

  useEffect(() => {
    {
      fetchtasks();
    }
  }, [task]);
  const fetchtasks = async () => {
    const res = await axios.get("http://localhost:3000/tasks");
    settask(res.data);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:3000/tasks/${editId}`, [text]);
      setisEditId(null);
    } else {
      await axios.post(`http://localhost:3000/tasks`, { text });
    }
    settext("");
    fetchtasks();
  };
  const handleedit = (task) => {
    settext(task.text);
    setisEditId(task._id);
  };

  const handledelete = async (id) => {
    await axios.delete(`http://localhost:3000/tasks/{id}`);
    fetchtasks();
  };

  return (
    <>
      <h1>Mini task manager</h1>
      <Taskform addTask={addTask} />
      <TaskList task={tasks} deletetask={deletetask} />
      {tasks.length > 0 &&
        tasks.map((task) => (
          <div>
            <li key={task._id}>{task.text}</li>
            <button onClick={() => handleedit(task)}>Edit</button>
            <button onClick={() => handledelete(task._id)}></button>
          </div>
        ))}
    </>
  );
}

export default App;
