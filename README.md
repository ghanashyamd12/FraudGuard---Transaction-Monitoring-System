# 🚀 FraudGuard — Transaction Monitoring & Fraud Detection System

## 🌐 Live Demo
👉 http://65.1.114.40:5173

---

## 📌 Overview

FraudGuard is a full-stack, real-time transaction monitoring system designed to detect fraudulent transactions using a machine learning model.

The system follows a **microservices architecture**, where the frontend, backend, ML service, and database run as independent services using Docker and communicate via REST APIs.

It is deployed on **AWS EC2** with container auto-restart, ensuring high availability and a production-like setup.

---

## 🎯 Key Features

- 🔐 Admin Authentication (Demo Login)
- 📊 Real-time Dashboard with live updates
- ⚠️ Fraud Alerts Page (high-risk transactions)
- 📈 Fraud vs Safe Visualization (Pie Chart)
- 🧾 Complete Transaction History Table
- ➕ Add Custom Transactions (manual testing)
- ⚡ Generate Sample Transactions (bulk simulation)
- 🤖 ML-based Fraud Detection
- 🔁 Auto-refresh UI (every 5 seconds)
- ☁️ AWS Deployment with Docker

---

## 🧠 Tech Stack

### 🖥️ Frontend
- React (Vite)
- Tailwind CSS
- Recharts

### ⚙️ Backend
- Node.js
- Express.js
- REST APIs

### 🤖 Machine Learning
- Python
- Scikit-learn

### 🗄️ Database
- PostgreSQL

### ⚙️ DevOps & Deployment
- Docker
- Docker Compose
- AWS EC2 (Ubuntu)
- Environment Variables (.env)
- Container Auto-Restart

---

## 🧱 System Architecture

The system follows a microservices-based architecture consisting of four main components:

### 1. Frontend (React)
- Built using React (Vite) and Tailwind CSS  
- Runs on Port 5173  
- Provides dashboard, transactions, and alerts UI  
- Communicates with backend via REST APIs  

### 2. Backend (Node.js)
- Built using Express.js  
- Runs on Port 5000  
- Handles API requests from frontend  
- Sends transaction data to ML service  
- Stores processed data in PostgreSQL  

### 3. Machine Learning Service (Python)
- Runs on Port 5001  
- Processes transaction data  
- Returns fraud score, classification, and reasons  

### 4. Database (PostgreSQL)
- Runs on Port 5432  
- Stores all transaction data  
- Maintains fraud results and history  

## 🔑 Demo Credentials

Email: admin@fraudguard.com  
Password: adminghana@123  

---

## ⚙️ Environment Configuration

### Frontend (.env)

VITE_API_URL=http://65.1.114.40:5000


### Backend (.env)

DATABASE_URL=postgresql://<username>:<password>@<host>:5432/<database>
JWT_SECRET=your_jwt_secret


---

## 🚀 Run Locally

git clone https://github.com/ghanashyamd12/FraudGuard---Transaction-Monitoring-System.git

cd FraudGuard---Transaction-Monitoring-System
docker-compose up --build


---

## ☁️ Deployment Details

- Hosted on AWS EC2 (Ubuntu)
- Dockerized services:
  - frontend
  - backend
  - ml-service
  - database
- Configured:
  - restart: always (auto recovery)
  - Docker auto-start on reboot

---

## 🧠 Engineering Highlights

- Microservices-based architecture
- REST API communication between services
- Real-time UI updates using polling
- Environment-based configuration (no hardcoding)
- Dockerized full-stack deployment
- Fault-tolerant system (auto-restart)

---

## 📈 Future Improvements

- JWT Authentication system
- Role-based access control
- Advanced ML models
- Real-time streaming (Kafka/WebSockets)
- Email/SMS fraud alerts
- Analytics dashboard

---

## 👨‍💻 Author

Ghanashyam D

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub!
