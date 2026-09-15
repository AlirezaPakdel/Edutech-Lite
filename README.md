# ⚡ EdutechLite | School Management System

<div align="center">

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

</div>

---

## 📖 About The Project
**EdutechLite** is a modern, lightweight, and secure school management system built using a decoupled architecture. Inspired by the warm and striking visual theme of **Hufflepuff**, the user interface blends aesthetic appeal with robust backend security to deliver a seamless educational management experience.

---

## 🛠 Tech Stack

### Backend:
* **Java 17+ / Spring Boot:** Core business logic and REST APIs
* **Spring Security:** Advanced authorization and security management
* **JWT (JSON Web Token):** Stateless authentication mechanism
* **Spring Data JPA / Hibernate:** ORM and database management
* **MySQL:** Relational database

### Frontend:
* **React.js:** Dynamic JavaScript library for user interfaces
* **React Router DOM:** Single-page application routing and navigation
* **Tailwind CSS:** Modern, responsive, and custom-styled utility-first CSS framework

---

## 📂 Security & Authentication Architecture
The project utilizes a token-based stateless authentication flow, powered by the following key components:
* `CustomUserDetailsService`: Loads user-specific data from the database
* `JwtAuthenticationFilter`: Intercepts and validates JWT tokens for incoming requests
* `JwtTokenProvider`: Handles token generation, signing, and claims validation
* `SecurityConfig`: Comprehensive security rules and endpoint protection mapping

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/AlirezaPakdel/Edutech-Lite.git
cd Edutech-Lite
```

### 2. Run the Backend
* Open the backend project in your preferred IDE (e.g., IntelliJ IDEA).
* Configure your MySQL database credentials in `application.properties`.
* Run the Spring Boot application.

### 3. Run the Frontend
```bash
cd front/freekala-frontend (or your frontend directory path)
npm install
npm run dev
```

---

## 👤 Author
**Alireza Pakdel**
* GitHub: [@AlirezaPakdel](https://github.com/AlirezaPakdel)

---
<div align="center">
Built with ⚡ and passion for smart educational management.
</div>
