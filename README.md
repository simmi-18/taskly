# Taskly – Todo App

A dark-themed, full-featured Todo app built with **React + Vite** (frontend) and **Flask** (backend).
Tasks and authentication data are fully stored in a **PostgreSQL** database.

## Features

🔐 Authentication

- **Signup & Login using:**
  Hashed passwords (bcrypt)
  Secure JWT tokens
  Full backend validation
  Protected routes on frontend using React routing + JWT.

- **Todo Features**
  **Add tasks** (title, description, priority, category)
  **Edit tasks** in a modal
  **Mark tasks** as completed
  **Delete tasks**
  **Filter** by All / Active / Completed
  **Live stats** → Total, Active, Completed
  Fully **responsive** (mobile-friendly)

🗄️ Storage
All data stored in PostgreSQL
No more localStorage-based auth or task storage

## Tech Stack

| Tool                                 | Version |
| ------------------------------------ | ------- |
| React                                | 18      |
| Vite                                 | 5       |
| Flask                                | 3       |
| Plain CSS (no Tailwind / UI library) | –       |

## Project Structure

```
taskly/
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── constants.js
│       ├── components/
│       │   ├── Icons.jsx
│       │   ├── TaskCard.jsx
│       │   └── EditModal.jsx
│       ├── hooks/
│       │   ├── useAuth.js
│       │   └── useTasks.js
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   └── TodoPage.jsx
│       └── routes/
│           ├── AppRoutes.jsx
│           ├── PublicRoute.jsx
│           └── ProtectedRoute.jsx
│
├── backend/
│   ├── app.py                 # Flask entry point
│   ├── config.py              # DB + JWT config
│   ├── extensions.py          # db, migrate, bcrypt, jwt initialization
│   ├── requirements.txt
│   ├── venv/
│   ├── controller/
│   │   ├── auth_controller.py
│   │   └── task_controller.py
│   ├── routes/
│   │   ├── auth_routes.py
│   │   └── task_routes.py
│   ├── models/
│   │   ├── users_model.py
│   │   └── task_model.py
│   └── migrations/
│       ├── alembic.ini
│       ├── env.py
│       ├── script.py.mako
│       └── versions/
│
└── README.md


```

## Getting Started

**Frontend (React + Vite)**
cd frontend
npm install
npm run dev

Visit: http://localhost:1717

**Backend (Flask)**
cd backend
source venv/bin/activate # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py

Backend runs on: http://localhost:1616

## Notes

-Data is stored securely in PostgreSQL.
-Passwords are hashed with bcrypt (never stored in plaintext).
-Authentication uses JWT tokens stored in localStorage.
-LocalStorage is used only for token storage, not for tasks or users.
-Built with React 18, Vite 5, and Flask 3.
