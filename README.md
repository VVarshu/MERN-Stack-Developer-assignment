# Admin Dashboard with Agent Task Distribution

This project is an **Admin Dashboard** that allows administrators to manage agents and distribute tasks efficiently. It includes **file upload**, **task assignment**, **CRUD operations**, and a **protected dashboard** with JWT authentication.

---

## **Features**

- **User Authentication**
  - Admin login using email and password.
  - JWT-based authentication for protected routes.

- **Dashboard**
  - View a summary of agents and tasks.
  - Count of tasks per agent is updated dynamically.

- **Task Upload**
  - Upload tasks via CSV file (`tasks.csv`).
  - Supports `.csv`, `.xlsx`, `.xls` formats.
  - Distributes tasks evenly among all agents (new and existing).

- **Agent Management**
  - Add new agents.
  - View assigned tasks.
  - Tasks are automatically distributed among agents.

- **Responsive UI**
  - Sidebar navigation.
  - Clean and minimalistic dashboard design.
  - Styled forms and tables.

---

## **Tech Stack**

- **Frontend:** React + Vite + React Router
- **Backend:** Node.js + Express
- **Database:** MySQL
- **Authentication:** JWT
- **HTTP Requests:** Axios

---

## **Setup Instructions**

Backend Setup
cd backend
npm install


Create a .env file with your MySQL credentials:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=tasks_db
JWT_SECRET=your_secret_key


Start the backend server:
npm run dev
3. Frontend Setup
cd frontend
npm install
npm run dev
Open http://localhost:5173 in your browser.
Login with your admin credentials to access the dashboard.

Usage

Login: Use admin email and password.

Dashboard: View agents and task counts.

Upload Tasks: Upload tasks.csv to distribute tasks evenly among agents.

Add Agents: Add new agents; new tasks will include them automatically.

View Tasks: Check assigned tasks per agent.

Project Video

A short video demonstrating the project functionality is attached.
