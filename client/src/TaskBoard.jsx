import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "./auth";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";
import { io } from "socket.io-client";



function TaskBoard() {

  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("new-message", (msg) => {
      setMessages((prev) => [...prev,msg]);
    });
    return() => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const socket = io("http://localhost:5000");

    socket.emit("send-message", msg);
    setMsg('');
  }

  const [columns, setColumns] = useState({ todo: [], inprog: [], done: [] });
  const [newTitle, setNewTitle] = useState("");
  

  const [editTaskId, setEditTaskId] = useState(null);   
  const [editTitle, setEditTitle] = useState(""); 

  const fetchTasks = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    const grouped = { todo: [], inprog: [], done: [] };
    res.data.forEach((task) => grouped[task.status].push(task));
    setColumns(grouped);
  };

  const statusLabels = {
  todo: "To Do",
  inprog: "In Progress",
  done: "Done"
  };

  const addTask = async () => {
    if (!newTitle.trim()) return;
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/tasks`,
      { title: newTitle },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    setNewTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchTasks();
  };

  const updateTask = async (id) => {
    if (!editTitle.trim()) return;

    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`, { title: editTitle }, { 
        headers:{ Authorization: `Bearer ${getToken()}`},
    });
    setEditTaskId(null);
    setEditTitle("");
    fetchTasks();
  }

  const handleDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if(!destination || source.droppableId === destination.droppableId) return;

    await axios.put(`http://localhost:5000/api/tasks/${draggableId}`, 
      {status: destination.droppableId},
      {headers: {Authorization: `Bearer ${getToken()}`}}
    );

    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
   <DragDropContext onDragEnd={handleDragEnd}>
    <div className="taskboard-container">
      {Object.entries(columns).map(([status, tasks]) => (
        <Droppable droppableId={status} key={status}>
          {(provided) => (
            <div
              className="taskboard"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h2>
                {status === "todo"
                  ? "To Do!"
                  : status === "inprog"
                  ? "In progress🏃‍♂️‍➡️"
                  : "Done🔥"}
              </h2>

              {status === "todo" && (
                <>
                  <input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="New task"
                  />
                  <button onClick={addTask}>Add Task</button>
                </>
              )}

              <ul>
                {tasks.map((task, index) => (
                  <Draggable
                    draggableId={task._id}
                    index={index}
                    key={task._id}
                  >
                    {(provided) => (
                      <div
                        className="task-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {editTaskId === task._id ? (
                          <>
                            <input
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              placeholder="Edit task title"
                            />
                            <button
                              className="delete-btn"
                              onClick={() => updateTask(task._id)}
                            >
                              ✅
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => setEditTaskId(null)}
                            >
                              ❌
                            </button>
                          </>
                        ) : (
                          <>
                            <h3>{task.title}</h3>
                            <button
                              className="delete-btn"
                              onClick={() => deleteTask(task._id)}
                            >
                              ❌
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => {
                                setEditTaskId(task._id);
                                setEditTitle(task.title);
                              }}
                            >
                              ✏️
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>
      ))}
      
    </div>
    </DragDropContext> 
    <div className="Live-chat">
      <h2>Chat</h2>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button onClick={sendMessage}>
        Send
      </button>
    </div>
   
  </>
  
  );
}

export default TaskBoard;
