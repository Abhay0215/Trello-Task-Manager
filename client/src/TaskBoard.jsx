import React, { useEffect, useState, useRef } from "react";
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

   const socket = useRef(null);

  const token = getToken();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;
  const userName = user?.name;

  useEffect(() => {
      // (async () => {
      //   try{
      //     const res = await axios.get("http://localhost:5000/api/messages", {
      //       headers: { Authorization: `Bearer ${token}`},
      //     });
      //     setMessages(res.data);
      //   } catch (err) {
      //     console.error(err);
      //   }
      // })();
    socket.current = io(`${import.meta.env.VITE_BACKEND_URL}`);

    socket.current.on("new-message", (msg) => {
      setMessages((prev) => [...prev,msg]);
    });
    return() => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [token]);

  const handleSend = () => {
    if(msg.trim()) {
    
      socket.current.emit("send-message", {
        text: msg,
        senderId: userId,
        senderName: userName
      });
      setMsg('');
    }
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

    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${draggableId}`, 
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
          <li key={msg._id}>
             <strong>{msg.senderName}:</strong> {msg.text}
             <span>({new Date(msg.timestamp).toLocaleString()})</span>
            </li>
        ))}
      </ul>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button onClick={handleSend}>
        Send
      </button>
    </div>
   
  </>
  
  );
}

export default TaskBoard;
