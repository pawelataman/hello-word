# Hello Word Project

This project consists of two main parts: a backend API built with Go and Fiber, and a frontend mobile app built with React Native and Expo.

## Backend

The backend is a simple Go application using the Fiber web framework.

### Setup

1. Ensure you have Go installed (version 1.23.0 or later).
2. Navigate to the `backend` directory.
3. Install dependencies:
4. Create a `.env` file in the `backend` directory and add your environment variables. For example:

### Running the Backend

To run the backend in development mode with hot-reloading:


This command uses `air` for live reloading.

The server will start on port 3000.

## Frontend

The frontend is a React Native application created with Expo.

### Setup

1. Ensure you have Node.js and npm installed.
2. Navigate to the project root directory.
3. Install dependencies:

### Running the Frontend

To start the Expo development server:


This will give you options to run the app on various platforms (iOS simulator, Android emulator, or Expo Go on a physical device).

## Project Structure

- `backend/`: Contains the Go backend code
  - `main.go`: Main entry point for the backend
  - `go.mod` & `go.sum`: Go module files
  - `.env`: Environment variables (not tracked in git)
  - `Makefile`: Contains commands for running the backend
- `app/`: Contains the React Native frontend code
  - `index.tsx`: Main entry point for the frontend
  - `_layout.tsx`: Root layout component for Expo Router
- `package.json`: Node.js package file for the frontend
- `app.json`: Expo configuration file
- `tsconfig.json`: TypeScript configuration

## Notes

- The backend uses `godotenv` to load environment variables from a `.env` file.
- The frontend uses Expo Router for navigation.
- Make sure to keep the `.env` file secret and not commit it to version control.

