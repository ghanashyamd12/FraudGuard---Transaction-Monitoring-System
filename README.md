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

graph TD
    subgraph Frontend [Client]
        React[React Frontend<br/>Port: 5173]
    end

    subgraph Backend [Server]
        Node[Node.js Backend<br/>Port: 5000]
    end

    subgraph Services [Data & AI]
        ML[ML Service<br/>Python / Port: 5001]
        DB[(PostgreSQL DB<br/>Port: 5432)]
    end

    User((User)) -->|HTTP/HTTPS| React
    React -->|API Requests| Node
    Node -->|Inference/Data| ML
    Node -->|CRUD Operations| DB

    style User fill:#f9f,stroke:#333,stroke-width:2px
    style React fill:#61dafb,stroke:#333
    style Node fill:#8cc84b,stroke:#333
    style ML fill:#ffcc00,stroke:#333
    style DB fill:#336791,stroke:#fff,color:#fff


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
