# SkilloraPath Enterprise Platform

A scalable, decoupled enterprise architecture structured into two main directories: **`frontend/`** and **`backend/`**.

---

## 📁 Project Architecture

```
agnix/
├── frontend/                     # Client Application
│   ├── assets/                   # Bundled production styles & scripts
│   ├── Images/                   # Image frames & animation sequences
│   ├── portfolio/                # Portfolio showcase assets
│   ├── review/                   # Client testimonial assets
│   ├── Team/                     # Team & leadership media
│   ├── src/                      # React SPA source code
│   │   ├── components/           # Reusable UI components
│   │   ├── layout/               # Navbars, Topbar, Sidebar
│   │   ├── lib/                  # Supabase & third-party clients
│   │   ├── services/             # Frontend data services & state
│   │   └── views/                # Views & routing pages
│   ├── index.html                # Main entry HTML
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   ├── postcss.config.js         # PostCSS configuration
│   └── package.json              # Frontend dependencies & build scripts
│
├── backend/                      # Server & API Platform
│   ├── src/
│   │   ├── config/               # Supabase & mail configurations
│   │   ├── controllers/          # Business logic (recruitment, leads, emails)
│   │   ├── middleware/           # Error handler, request validation
│   │   ├── routes/               # Modular Express API endpoints
│   │   └── server.js             # Main Express server entry point
│   ├── scripts/                  # Database tools, scanners, migration scripts
│   ├── .env.example              # Environment variables template
│   └── package.json              # Backend dependencies & server scripts
│
├── package.json                  # Root workspace script runner
├── README.md                     # Architecture documentation
└── .gitignore                    # Version control ignores
```

---

## 🚀 Running the Project

### 1. Frontend (Web Application)
```bash
# Run from root:
npm run dev:frontend

# Or directly in frontend folder:
cd frontend
npm run dev
```
* **URL:** `http://localhost:5173`

### 2. Backend (Express API Server)
```bash
# Run from root:
npm run dev:backend

# Or directly in backend folder:
cd backend
npm run dev
```
* **URL:** `http://localhost:5000`
* **Health Check:** `http://localhost:5000/api/health`

---

## 🔒 Separation of Concerns
* **Frontend:** Independent SPA serving the main landing page, customer touchpoints, and interactive dashboards.
* **Backend:** REST API handling recruitment submissions, lead capture, Supabase database queries, and notifications.
