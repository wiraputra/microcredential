# BangJek Microservices Application

A premium, modern ride-sharing and delivery booking application built using a microservices architecture. This repository is structured as a **Monorepo** containing both the Next.js frontend and the Quarkus backend services.

---

## 📂 Repository Structure

- **`(StarterCode)-fe-microservice-nextjs/`**: Next.js 15+ frontend application.
- **`user-service/`**: Quarkus microservice managing user profiles, JWT authentication, and administrative consoles.
- **`order-service/`**: Quarkus microservice handling order placement, driver processing, and status mutations.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS v4 & custom design tokens
- **Typography**: Inter (Google Fonts via Next.js Font Optimization)
- **State & Fetching**: TanStack Query (React Query), Formik
- **Icons**: Custom SVG prefix icons integrated into all fields

### Backend Microservices
- **Framework**: Quarkus (Java JDK 17+)
- **ORM & DB**: Hibernate ORM, Panache Active Record, MySQL
- **Security**: JWT RBAC (Role-Based Access Control) via SmallRye JWT
- **Communication**: Quarkus REST Client for inter-service communication

---

## 🚀 How to Run Locally

### Prerequisites
1. **Node.js** (v18+)
2. **Java JDK** (17 or higher)
3. **MySQL Server** running locally on port `3306`

### Database Setup
Create two MySQL databases running locally:
1. `bangjeck_user_db` (for the User Service)
2. `bangjeck_order_db` (for the Order Service)

---

### Step-by-Step Running Guide

#### 1. Start the User Service (Port 8081)
```bash
cd user-service
./mvnw quarkus:dev
```

#### 2. Start the Order Service (Port 8082)
```bash
cd order-service
./mvnw quarkus:dev
```

#### 3. Start the Next.js Frontend (Port 3000)
Navigate to the frontend folder, install dependencies, and run the development server:
```bash
cd "(StarterCode)-fe-microservice-nextjs"
npm install
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## 🌐 Deployment Guidelines

### 1. Frontend (Vercel)
This monorepo supports direct deployment to Vercel:
- Import the repository.
- Under **Configure Project**, set the **Root Directory** to `(StarterCode)-fe-microservice-nextjs`.
- Add Environment Variables:
  - `API_BASE_URL_USER`: URL of your deployed User Service
  - `API_BASE_URL_ORDER`: URL of your deployed Order Service

### 2. Backend Services (Railway / Render / VPS)
- Deploy `user-service` and `order-service` to a Java/Docker-capable cloud platform.
- Connect online MySQL database instances.
- Ensure that you configure the environment variables `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, and `CORS_ORIGINS` (pointing to your Vercel frontend domain) on the host environment.
