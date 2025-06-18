# 📝 Task Master — A Full Stack Kanban Task Manager 🚀

🔗 **Live Demo:** [https://taskmasterquick.netlify.app](https://taskmasterquick.netlify.app)

Task Master is a full-stack **Trello-inspired task management app** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. Users can register, sign in, manage personal tasks on a drag-and-drop Kanban board, and enjoy **real-time chat**, **protected dashboards**, and **individualized data access**.

---

## 🔧 Tech Stack

- **Frontend:** React.js, React Router, Axios, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens), Bcrypt.js
- **Real-time:** Socket.IO
- **Deployment:** Netlify (frontend), Render (backend), MongoDB Atlas (database)

---

## 📦 Key Features

| Feature                           | Status |
| -------------------------------- | ------ |
| User Registration/Login          | ✅     |
| JWT Token Authentication         | ✅     |
| Protected Routes (Frontend + API)| ✅     |
| Task CRUD Operations             | ✅     |
| User-specific Data Isolation     | ✅     |
| Drag-and-Drop Task Board         | ✅     |
| Live Chat                        | ✅     |
| Profile Section                  | ✅     |
| Logout & Token Expiry Handling   | ✅     |
| Deployment (Netlify + Render)    | ✅     |

---

## 🧱 Folder Structure

```
Trello-Task-Manager/
├── client/              # Frontend (React)
│   ├── App.jsx
│   ├── Signin.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── TaskBoard.jsx
│   ├── Chat.jsx
│   ├── auth.jsx
│   ├── Nbar.jsx
│   └── styles/
│       └── Signin.css
├── server/              # Backend (Express)
│   ├── index.js
│   ├── models/
│   │   └── User.js, Task.js, message.js
│   ├── routes/
│   │   └── auth.js, task.js, Message.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── config/
│   │   └── db.js
│   └── controllers/
└── README.md
```

---

## ⚙️ Getting Started Locally

### 🔌 Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```
MONGO_URI=mongodb+srv://your-mongo-url
JWT_SECRET=your-secret-key
```

```bash
npm run dev
```

### 💻 Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

---

## 🌐 API Endpoints

### Auth

```http
POST /api/auth/register
POST /api/auth/signin
```

### Tasks (Requires Bearer Token)

```http
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

---

## 🚀 Deployment

- **Frontend** deployed to **Netlify**
- **Backend** deployed to **Render**
- **MongoDB** hosted on **MongoDB Atlas**

✅ Integrated Axios for seamless frontend-backend communication with <200ms average response time.  
✅ Environment variables handled securely using `.env` files.

---

## 📸 Screenshots

| Kanban Dashboard | Live Chat | Auth System |
|------------------|-----------|-------------|
| ![Board](./screenshots/board.png) | ![Chat](./screenshots/chat.png) | ![Login](./screenshots/login.png) |

> _Note: Replace with your actual screenshot paths or hosted image links if needed._

---

## 📍 Future Enhancements

- [ ] Task collaboration with multiple users
- [ ] Notifications (push/toast)
- [ ] Task due dates & priority tags
- [ ] Dark mode toggle
- [ ] Editable profile and image upload

---

## 👨‍💻 Author

**Abhay Rana**  
📧 [abhayrana089@gmail.com](mailto:abhayrana089@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/abhay-rana-5a6b03268) | [GitHub](https://github.com/Abhay0215)

---

⭐ If you liked this project, give it a star and follow for more!  
💬 Feel free to contribute or open issues for feedback or collaboration.

