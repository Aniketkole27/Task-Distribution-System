# Task Distribution System

This is a full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a comprehensive administrative dashboard to create projects, manage team members, and distribute tasks efficiently.

## Core Features

*   **User Authentication**: Secure user registration and login system with JWT for session management and bcrypt for password hashing.
*   **Admin Dashboard**: A central interface providing an at-a-glance overview of key metrics, including total members, project counts, and active project statuses.
*   **Project Management**: Functionality to create new projects with details like name, description, due date, and priority. Users can view and filter all projects by their status (e.g., active, completed, failed).
*   **Team Organization**: Add and manage team members, assigning them roles such as Admin, Sub-Admin, or User. The system displays a clear, role-based list of all team members.
*   **Dynamic UI**: A modern frontend built with React and styled with Tailwind CSS, featuring a responsive layout, a dark/light theme toggle, and a `cmdk` powered command menu (accessible with `⌘K` or `Ctrl+K`) for quick actions.
*   **State Management**: Centralized frontend state management using Redux Toolkit for a predictable and scalable application state.

## Tech Stack

| Component | Technology                                                                              |
| :-------- | :-------------------------------------------------------------------------------------- |
| **Backend**   | Node.js, Express.js, MongoDB, Mongoose, JSON Web Token (JWT), bcrypt, Joi                |
| **Frontend**  | React, Vite, Redux Toolkit, Tailwind CSS, Lucide React, `cmdk`                          |

## Project Structure

The repository is organized as a monorepo with two main directories:

*   `/Backend`: Contains the Node.js/Express server. It follows a modular structure with distinct folders for routes, controllers, models, and middleware.
*   `/Frontend`: Contains the React client application, built with Vite. Components are organized by feature (Dashboard, Projects, Team) within the `src/components/Admin` directory.

## Getting Started

To run this project locally, follow the steps below.

### Prerequisites

*   Node.js (v20.x or later)
*   npm (or a compatible package manager)
*   A running MongoDB instance (local or cloud-based)

### Backend Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/aniketkole27/task-distribution-system.git
    cd task-distribution-system
    ```

2.  **Navigate to the backend directory:**
    ```sh
    cd Backend
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Create an environment file:**
    Create a `.env` file in the `Backend` directory and add the following variables:
    ```env
    PORT=8000
    URL_DB=your_mongodb_connection_string
    SK=your_jwt_secret_key
    ```

5.  **Start the server:**
    The server will start on the port you specified in your `.env` file.
    ```sh
    nodemon index.js
    ```

### Frontend Setup

1.  **Navigate to the frontend directory from the root:**
    ```sh
    cd Frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Start the development server:**
    The React application will be available at `http://localhost:5173` (or the next available port).
    ```sh
    npm run dev
