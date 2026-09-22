# 🌤️ Weather App (React + TypeScript + Vite)

A modern, responsive, and beautifully designed Weather Application featuring a glassmorphism UI. This project displays real-time weather details for any city globally using production-ready APIs and a fully automated CI/CD pipeline.

## 🚀 Live Demo
[👉 Click here to view the live project](https://infiniteatomik-droid.github.io/weather-app/)

---

## 🔧 The Refactoring Journey (What I Did)
This project underwent a massive upgrade to meet modern frontend development standards:
* **Migration to TypeScript:** Completely rewrote the legacy JavaScript codebase into strictly typed **TypeScript (TSX)**, adding proper interfaces (`WeatherData`) for robust state management.
* **Architecture Upgrade:** Moved the environment from standard React scripts to **Vite** for blazing-fast local development and optimized production builds.
* **API Optimization:** Migrated from paid/restricted API keys to the free, high-performance **Open-Meteo API**. Implemented a two-step asynchronous logic: first fetching exact coordinates via the Geocoding API, then pulling precise weather metrics.
* **UI/UX Redesign:** Replaced the plain blueprint styles with a stunning **Glassmorphism theme** using CSS Flexbox, CSS Grid layout systems, and customized WMO (World Meteorological Organization) weather condition mapping.
* **CI/CD Automation:** Set up and fixed a secure **GitHub Actions workflow (Node 20 / v5 actions)** to enable automatic deployments straight to GitHub Pages upon every `git push`.

---

## 🛠️ Tech Stack & Concepts Used
* **Frontend:** React 18, TypeScript, HTML5, Modern CSS (Flexbox, Grid, Glassmorphism effects)
* **Build Tool:** Vite
* **APIs Used:** Open-Meteo Geocoding API & Weather Forecast API
* **DevOps:** GitHub Actions, GitHub Pages

---

## 📦 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-react-ts
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:5173/weather-app/](http://localhost:5173/weather-app/) in your browser.
