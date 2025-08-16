# AI Chatbot using Google API

An intelligent chatbot built with the **Google Gemini API**, featuring a **simple UI** and **real-time AI responses**. Designed with HTML, CSS, JavaScript, and a Python Flask backend.

---

## 🚀 Features
- 🖥️ Simple & clean UI  
- ⚡ Real-time AI responses  
- 🔑 Secure API key handling with `.env`  
- 🌍 Deployable anywhere (Heroku, Vercel, Netlify, or your own server)  

---

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Python (Flask)  
- **AI Model:** Google Gemini API  

---
## Screenshots 
<img width="992" height="2126" alt="127 0 0 1_5000_" src="https://github.com/user-attachments/assets/eefab6d4-6a79-4d75-867f-6207e11a0fad" />

<img width="907" height="448" alt="Screenshot 2025-08-16 200442" src="https://github.com/user-attachments/assets/c7b81522-3ec9-49b9-9bfa-d3f1fba00aaa" />

---
## 📦 Setup Guide

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ai-chatbot-google-api.git
cd ai-chatbot-google-api
```
### 2. (Optional) Create a virtual environment
It’s a good practice to isolate project dependencies.

On Windows:
```bash
python -m venv venv
.\venv\Scripts\activate
```

On Mac/Linux:
```bash
python -m venv venv
source venv/bin/activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```
### 4. Configure environment variables

Create a .env file in the root folder:
```bash
GEMINI_API_KEY=your_api_key_here
```

👉 You can generate your API key from Google AI Studio.

Tip: Do not commit your .env file to GitHub. Instead, provide an example file:

### .env.example
```bash
GEMINI_API_KEY=your_api_key_here
```

### 5. Run the application
```bash
python app.py
```
### 6. Open in browser
```bash
http://127.0.0.1:5000/
```

### 🌍 Deployment

This chatbot can be deployed on multiple platforms:

Heroku (Flask backend)
Vercel / Netlify (Frontend hosting)
Docker (Containerized deployment)

```DockerFile
FROM python:3.10
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```
