# Project Structure Overview

The InterEd-Portal project is structured into several key directories and files. The main components are the `client/` directory for frontend code, the `server/` directory for backend code, and the `shared/` directory for shared configurations or schemas.

## Overall Project Structure

- `client/`: Contains the frontend application code.
- `server/`: Houses the backend server code.
- `shared/`: Includes shared configurations or schemas used across the project.
- `attached_assets/`: Stores various image assets and documentation files.

## Frontend Components

The frontend is built using React and Vite. Key files and directories include:

- `client/index.html`: The entry point for the frontend application.
- `client/src/main.tsx`: The main TypeScript file that renders the React application.
- `client/src/components/`: A directory containing various React components organized into subdirectories for different features (e.g., agents, applications, auth, students).
- `client/src/pages/`: Contains React components for different pages of the application.
- `client/src/contexts/`: Provides React contexts for managing state across the application.
- `client/src/hooks/`: Custom React hooks for handling specific logic or data fetching.
- `client/src/lib/`: Utility functions and constants used throughout the frontend.

## Backend Components

The backend is set up with Node.js and likely uses Express or a similar framework. Important files include:

- `server/index.ts`: The entry point for the backend server.
- `server/auth.ts`: Handles authentication-related logic.
- `server/db.ts`: Manages database interactions.
- `server/routes.ts`: Defines API routes for the backend.
- `server/seed.ts`: Used for seeding the database with initial data.
- `server/storage.ts`: Handles storage-related operations.

## Shared Elements

- `shared/schema.ts`: Defines schemas that are used across both the frontend and backend, ensuring consistency in data structures.

## Configuration Files

- `package.json`: Contains project dependencies and scripts.
- `tsconfig.json`: Configures TypeScript settings for the project.
- `vite.config.ts`: Configures the Vite development server and build process.
- `tailwind.config.ts`: Configures Tailwind CSS for styling.
- `postcss.config.js`: Configures PostCSS for processing CSS.