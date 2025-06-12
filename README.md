# 📝 Trello Task Manager (MERN Stack)

A full-stack Trello-inspired task management application built using the **MERN stack (MongoDB, Express, React, Node.js)** with JWT-based authentication.

This project allows users to register, sign in, and manage their personal tasks in a kanban-style interface. The backend supports CRUD operations for tasks and protects routes using token authentication.

> ⚠️ This project is a work-in-progress. I'm actively working on improving the UI, adding drag-and-drop support, filtering, user collaboration features, and more!

---

## 🔧 Tech Stack

- **Frontend:** React.js, React Router DOM
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT)
- **Styling:** CSS (planning Tailwind integration)

---

## 📦 Features

| Feature                     | Status ✅ |
|----------------------------|-----------|
| Register & Sign In         | ✅        |
| JWT Token Auth             | ✅        |
| Protected Routes           | ✅        |
| Task CRUD (Create/Read/Update/Delete) | ✅ |
| User-specific Task Access  | ✅        |
| Task Status (ToDo/InProg/Done) | ✅  |
| Logout + Session Handling  | ✅        |
| UI Polishing               | ✅ |
| Drag-and-drop              | ✅|
| Task Collaboration         | 🛠 Planned |

---

## 📁 Folder Structure (Simplified)

```
root/
├── client/               # React Frontend
│   ├── App.jsx
│   ├── auth.jsx
│   ├── Signin.jsx
│   ├── register.jsx
│   ├── dashboard.jsx
│   ├── TaskBoard.jsx
│   └── ProtectedRoute.jsx
├── server/               # Express Backend
│   ├── index.js
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── config/db.js
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/Trello-Task-Manager.git
cd Trello-Task-Manager
```

### 2. Setup Backend
```bash
cd server
npm install
```

> Create a `.env` file inside the `server/` directory:
```
MONGO_URI=mongodb://127.0.0.1:27017/trello-clone
JWT_SECRET=supersecretkey123
```

```bash
npm run dev
```
The backend should now be running on `http://localhost:5000`

### 3. Setup Frontend
```bash
cd ../client
npm install
npm start
```
Frontend should be live at `http://localhost:3000`

---

## ✅ API Endpoints

### 🔐 Auth Routes
```
POST   /api/auth/register
POST   /api/auth/signin
```
### 📋 Task Routes (Protected)
```
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```
All task routes require this header:
```
Authorization: Bearer <token>
```

---

## 💡 Roadmap

- [x] Auth system with JWT
- [x] Full task CRUD (by user)
- [x] UI polishing & mobile responsiveness
- [x] Drag-and-drop kanban columns
- [ ] Task labels, due dates
- [ ] User/team-based task sharing
- [ ] Dark mode toggle
- [x] Hosted demo (Render/Vercel)

---

## 👨‍💻 Author

**Abhay Rana**  
📧 [Gmail](mailto:abhayrana089@gmail.com)  
🔗 [LinkedIn](www.linkedin.com/in/abhay-rana-5a6b03268) | [GitHub](https://github.com/Abhay0215)

> If you find this project useful, feel free to ⭐ the repo and follow for updates!

---
