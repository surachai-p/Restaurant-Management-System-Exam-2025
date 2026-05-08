# Testing Configuration

## Backend Testing Setup
cd backend
npm install --save-dev vitest @vitest/ui supertest @types/supertest
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

## Frontend Testing Setup
cd ../frontend
npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install --save-dev jsdom

## E2E Testing Setup
cd ..
npm install --save-dev @playwright/test
npx playwright install

## Environment Setup

### Backend
# Create `.env.test` file
DATABASE_URL=postgresql://user:password@localhost:5432/restaurant_test
JWT_SECRET=test-secret-key
NODE_ENV=test

### Frontend
# Create `.env.test` file
VITE_API_URL=http://localhost:3000/api

## Run Tests

# Backend Unit Tests
npm run test:unit

# Backend Integration Tests
npm run test:integration

# Frontend Tests
npm run test

# E2E Tests
npm run test:e2e

# All tests with coverage
npm run test:all
