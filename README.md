``
# 📓 FULL-STACK-JOURNAL

_Transforming Journals with AI-Driven Insights and Secure Authentication_

![Last Commit](https://img.shields.io/github/last-commit/YourUsername/YourRepoName?color=blue&style=flat)
![Python](https://img.shields.io/badge/python-78.1%25-yellow)
![Languages](https://img.shields.io/github/languages/count/YourUsername/YourRepoName)

---

## 🛠 Built with the tools and technologies:

![JSON](https://img.shields.io/badge/JSON-black?logo=json&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000?logo=markdown&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Django](https://img.shields.io/badge/Django-092E20?logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?logo=google&logoColor=white)

---

## 📑 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Backend (Django)](#backend-django)
- [Frontend (React)](#frontend-react)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## 📌 Overview
Full-Stack Journal is a personal journal application that allows users to:
- Create, read, update, and delete journal entries.
- Search journals by title.
- Generate AI-powered summaries using Google Gemini.
- Authenticate securely with JWT-based sign-in and sign-up.
- Access entries only when logged in.

---

## ✨ Features
- **Authentication:** Sign up, sign in, token refresh, and logout.
- **AI Integration:** Summarize journal entries with AI.
- **Search:** Filter journals by title.
- **Secure API:** All journal routes are protected with JWT.
- **Full-Stack:** Built with Django (backend) and React + Vite (frontend).

---

## ⚙ Backend (Django)
- Django
- Django REST Framework (DRF)
- JWT Authentication (`rest_framework_simplejwt`)
- PostgreSQL / SQLite support

---

## 🎨 Frontend (React)
- React + Vite
- Axios
- Tailwind CSS
- JWT token storage & usage

---

## 🚀 Installation

### 1️⃣ Backend Setup
```bash
cd Backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 2️⃣ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 🔗 API Endpoints

| Method | Endpoint                    | Description              |
| ------ | --------------------------- | ------------------------ |
| POST   | `/signup/`                  | Create new user          |
| POST   | `/signin/`                  | Login user               |
| POST   | `/token/refresh/`           | Refresh JWT token        |
| GET    | `/journals/`                | Get all journals         |
| GET    | `/journals/search/<title>/` | Search journals by title |
| GET    | `/journals/<id>/`           | Get single journal       |
| PUT    | `/journals/<id>/update/`    | Update journal           |
| DELETE | `/journals/<id>/delete/`    | Delete journal           |
| POST   | `/journals/summary/`        | Generate AI summary      |

---

## 📜 License

This project is licensed under the MIT License.

```


