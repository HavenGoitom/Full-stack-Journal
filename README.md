---

# 📝 Daily Journal App (Django + DRF)

A personal journaling application built with **Django REST Framework**, featuring secure authentication, journal management, and AI-powered summaries using **Google Gemini**.

---

## 🚀 Features

* **User Authentication** (Sign Up, Sign In, Logout)
* **Create, View, Update, Delete** journal entries
* **Search journals** by title (user-specific)
* **AI-powered summaries** of journal entries via Google Gemini API

---

## 📡 API Endpoints

### 🔍 Search Journals

`GET /journals/search/<title>/`
**Auth Required:** Yes
Returns journals for the current user whose title contains `<title>`.

### 🧠 Generate Summary

`POST /journals/summary/`
**Auth Required:** Yes
Generates a short summary of provided journal text using Google Gemini.

---

## 🛠 Setup

1. **Clone the repo**

   ```bash
   git clone <repo-url>
   cd journal-app
   ```
2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```
3. **Set environment variables**

   * `SECRET_KEY`
   * `DATABASE_URL`
   * `GEMINI_API_KEY`
4. **Run migrations**

   ```bash
   python manage.py migrate
   ```
5. **Start server**

   ```bash
   python manage.py runserver
   ```

---

## 🧑‍💻 Tech Stack

* Django & Django REST Framework
* Google Generative AI (Gemini)
* JWT Authentication

---

Do you want me to also **add example API requests & responses** inside this README so your frontend partner doesn’t have to check another doc? That would make it even handier.

