<h1 align="center">🛍️ E-Commerce Web Application - Frontend</h1>

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</div>

<br />

<div align="center">
  <strong>A modern, responsive e-commerce frontend built with React, demonstrating proficiency in component-based architecture, state management, and API integration.</strong>
</div>

<div align="center">
  <sub>Built by <a href="https://github.com/aswinns369">Aswin N S</a></sub>
</div>

<br />

## 📖 Overview

This repository contains the frontend client for a full-stack E-Commerce Web Application using the MERN stack. It interfaces seamlessly with the [Backend REST API](https://github.com/aswinns369/mern-mini-backend) to provide users with a complete end-to-end shopping experience, from browsing products to managing carts and secure user authentication.

🔗 **Frontend Repository:** [mern-mini-frontend](https://github.com/aswinns369/mern-mini-frontend)  
🔗 **Backend Repository:** [mern-mini-backend](https://github.com/aswinns369/mern-mini-backend)

## ✨ Key Features & Technical Highlights

### User Experience & Interface
- **Dynamic Product Grid:** Responsive product showcase with dynamic aspect ratios and premium visual fidelity.
- **Myntra-Inspired Design:** Clean, minimalist UI crafted with pure Vanilla CSS, optimized for lightning-fast load times.
- **Client-Side Routing:** Seamless and fast navigation using `react-router-dom` without full page reloads.

### Core Business Logic
- **Authentication & Authorization:** Secure JWT-based login and signup flow with resilient session state handling.
- **Cart Management:** Real-time adding/removing of products, dynamic quantity adjustments, and immediate cart total summaries.
- **Product Operations (CRUD):** Authenticated users can securely add, edit, and delete products directly through intuitive, user-friendly forms.
- **Image Upload Integration:** Works with the backend (Multer/Cloud API) to seamlessly upload and display product images.

---

## 🛠️ Technical Architecture

This project was built with a strong focus on clean code practices, modular component design, and minimal external dependencies to showcase foundational web engineering skills.

- **Core Framework:** React 19 (Hooks/Functional Components)
- **Build Tool:** Vite (For ultra-fast HMR and optimized production builds)
- **Routing:** React Router v7
- **Styling:** Vanilla CSS3 (Custom CSS properties, CSS Grid, Flexbox, media queries for comprehensive responsiveness)
- **Network Requests:** Axios (Configured for API interceptions and JWT authorization header attachments)

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aswinns369/mern-mini-frontend.git
   cd mern-mini-frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and configure your backend API base URL (ensure your backend is also running):
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

5. **Access the Application:** Open your browser and navigate to `http://localhost:5173`.

---

## 📂 Folder Structure Architecture

```text
src/
├── assets/             # Static assets (Images, SVGs, etc.)
├── components/         # Reusable UI components (Navbar, Footer, ProductCard, etc.)
├── pages/              # Route-level components handling distinct views
│   ├── auth/           # Login, Signup, Password reset flows
│   ├── cart/           # Shopping cart interactions and checkout UI
│   ├── add-products/   # Product creation and editing forms
│   └── Home/           # Main landing view and product catalog
├── utils/              # Helper functions and business logic utilities
├── api.jsx             # Axios interceptor and centralized API route configuration
├── App.jsx             # Application root and React Router switch map
├── index.css           # Global typography, resets, and base CSS variables
└── main.jsx            # React Virtual DOM rendering entry point
```

---

## 👤 Author

**Aswin N S**
- GitHub: [@aswinns369](https://github.com/aswinns369)
- *Feel free to reach out for any discussions regarding web development or software engineering opportunities!*
