import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "./auth";

function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  const [editTaskId, setEditTaskId] = useState(null);   
  const [editTitle, setEditTitle] = useState(""); 

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTitle.trim()) return;
    await axios.post(
      "http://localhost:5000/api/tasks",
      { title: newTitle },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    setNewTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchTasks();
  };

  const updateTask = async (id) => {
    if (!editTitle.trim()) return;

    await axios.put(`http://localhost:5000/api/tasks/${id}`, { title: editTitle }, { 
        headers:{ Authorization: `Bearer ${getToken()}`},
    });
    setEditTaskId(null);
    setEditTitle("");
    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="taskboard-container">
    <div className="taskboard">
      <h2>To DO!</h2>
      <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="New task" />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
            <div className="task-card" key={task._id}>
            {editTaskId === task._id ? (
            <>
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Edit task title"
        />
        <button className="delete-btn" onClick={() => updateTask(task._id)}>✅</button>
        <button className="delete-btn" onClick={() => setEditTaskId(null)}>❌</button>
        </>
        ) : (
      <>
        <h3>{task.title}</h3>
        <button className="delete-btn" onClick={() => deleteTask(task._id)}>❌</button>
        <button className="delete-btn" onClick={() => {
          setEditTaskId(task._id);
          setEditTitle(task.title);
        }}>✏️</button>
      </>
        )}
    </div>
        ))}

        </ul>
    </div>
    <div className="taskboard">
        <h2>In progress🏃‍♂️‍➡️</h2>
    </div>
    <div className="taskboard">
        <h2>Done🔥</h2>
    </div>
    </div>
  );
}

export default TaskBoard;
