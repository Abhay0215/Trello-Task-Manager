import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "./auth";

function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");

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

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="taskboard">
      <h2>My Tasks</h2>
      <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="New task title" />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} <button onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskBoard;
