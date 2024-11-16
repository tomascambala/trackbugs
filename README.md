# Bug Tracker Application

A Node.js and React application to manage system bugs using a CSV file.

## Requirements

- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **Testing**: Jest for unit tests, Cucumber for BDD tests
- **Deployment**: Docker for building and running the app

## Getting Started

### Build and Run the Application

1. Navigate to the project root and run:

   ```bash
   docker-compose up --build

2. Access the app:

Frontend: http://localhost:3000
Backend: http://localhost:5000


markdown
Copy code
# Bug Tracker Application

A Node.js and React application to manage system bugs using a CSV file.

## Features

1. **Create a New Issue**:
   - Parameters: 
     - Parent Issue ID (string)
     - Description (string)
     - Link (URL to the log)

2. **Close an Existing Issue**:
   - Mark a selected issue as closed.

3. **CSV Storage**:
   - Issues are stored and managed in a CSV file.

## Requirements

- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express + TypeScript
- **Testing**: Jest for unit tests, Cucumber for BDD tests
- **Deployment**: Docker for building and running the app

## Getting Started

### Build and Run the Application

3 Run Tests
Frontend Unit Tests:

cd ui
npm install
npm run test

Backend Unit Tests:

cd server
npm install
npm run jest

Navigate to the project root and run (install docker):

   docker-compose up --build

Access the app:

Frontend: http://localhost:3000
Backend: http://localhost:5000

RUN BDD:

cd server
npm run test