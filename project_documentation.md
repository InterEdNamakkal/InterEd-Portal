# Project Documentation

## Overview

The InterEd-Portal project is a full-stack application built with React for the frontend and Express for the backend. It features a comprehensive student management system with various modules for managing students, applications, agents, universities, and more.

## Frontend

The frontend is built using React and Vite. Key features include:

- Authentication: Login and registration pages with protected routes.
- Student Management: Management of student data, including filtering by status (prospective, current, alumni).
- Application Processing: Handling of applications through different stages.
- Agent Management: Management of agents and their performance metrics.
- University Management: Management of university data and program catalogs.

The frontend uses React Query for data fetching and caching, and Tailwind CSS for styling.

## Backend

The backend is set up with Express and includes:

- Session Management: Using `express-session` with PostgreSQL as the session store in production.
- Authentication: Using Passport.js for authentication.
- API Routes: Defined in `server/routes.ts`, handling various API endpoints for data management.

The backend serves both the API and the client on port 5000.

## Shared Elements

The project uses shared schemas defined in `shared/schema.ts` to ensure consistency in data structures across both the frontend and backend.

## Configuration

- `package.json`: Contains project dependencies and scripts.
- `tsconfig.json`: Configures TypeScript settings.
- `vite.config.ts`: Configures the Vite development server and build process.

## Workings

1. **Authentication Flow**: Users can log in or register through the frontend. Authentication is handled by Passport.js on the backend, with session management ensuring that protected routes are accessible only to authenticated users.

2. **Data Management**: The frontend interacts with the backend API to manage data such as students, applications, agents, and universities. React Query is used to fetch and cache data, improving performance.

3. **Routing**: The frontend uses `wouter` for client-side routing, with protected routes ensuring that sensitive areas are only accessible to authenticated users. The backend defines API routes for data management.

4. **Styling**: Tailwind CSS is used for styling the frontend, providing a consistent and responsive design.

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in an existing user.
- `GET /api/auth/logout`: Log out the current user.
- `GET /api/auth/current-user`: Get the current authenticated user.

### Students

- `GET /api/students`: Fetch all students.
- `GET /api/students/:id`: Fetch a student by ID.
- `POST /api/students`: Create a new student.
- `PUT /api/students/:id`: Update a student by ID.
- `DELETE /api/students/:id`: Delete a student by ID.
- `GET /api/students/filter/stage/:stage`: Filter students by stage.

### Universities

- `GET /api/universities`: Fetch all universities.
- `GET /api/universities/:id`: Fetch a university by ID.
- `POST /api/universities`: Create a new university.
- `PUT /api/universities/:id`: Update a university by ID.
- `DELETE /api/universities/:id`: Delete a university by ID.
- `GET /api/programs/university/:universityId`: Fetch programs by university ID.

### Programs

- `GET /api/programs`: Fetch all programs.

### Agents

- `GET /api/agents`: Fetch all agents.

### Applications

- `GET /api/applications`: Fetch all applications.
- `GET /api/applications/:id`: Fetch an application by ID.
- `POST /api/applications`: Create a new application.
- `PUT /api/applications/:id`: Update an application by ID.
- `DELETE /api/applications/:id`: Delete an application by ID.
- `GET /api/applications/filter/stage/:stage`: Filter applications by stage.
- `GET /api/applications/student/:studentId`: Fetch applications by student ID.
- `GET /api/applications/university/:universityId`: Fetch applications by university ID.
- `GET /api/applications/program/:programId`: Fetch applications by program ID.

### Statistics

- `GET /api/stats/students/stage-counts`: Get student count by stage.
- `GET /api/stats/applications/stage-counts`: Get application count by stage.

## Conclusion

The InterEd-Portal project is a robust full-stack application designed for comprehensive student management. It leverages modern technologies like React, Express, and PostgreSQL to provide a scalable and maintainable solution.