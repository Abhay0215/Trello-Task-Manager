import React from "react";

function About() {
    return (
    <div className="about-container">
      <h1>About Task Manager</h1>
      <p>
        Task Manager is a full-stack productivity application built with the MERN stack.
        It helps users create, manage, and organize tasks across different stages like 
        <strong> To Do</strong>, <strong>In Progress</strong>, and <strong>Done</strong>.
      </p>
      <p>
        The app features real-time collaboration using <strong>Socket.IO</strong>,
        user authentication with <strong>JWT</strong>, and secure data storage via <strong>MongoDB</strong>.
        Users can edit, drag-and-drop tasks across columns and chat with each other live.
      </p>
      <p>
        This project is currently under active development with planned features like 
        profile customization, password update, role-based access, and analytics dashboard.
      </p>
    </div>
  );

}

export default About;