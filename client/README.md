
# Flight Price API Application

A full-stack application for searching and tracking flight prices.

## Features

- Flight search with source, destination, and date
- User authentication (register/login)
- Responsive design for all devices
- Clean REST API with proper architecture

## Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Query for data fetching
- React Hook Form for form handling
- Zod for form validation

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT authentication
- MVC architecture

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and fill in your configuration:
   ```
   PORT=5000
   NODE_ENV=development
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the project root directory.

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will run on `http://localhost:8080`.

## Deployment

### Backend Deployment
The backend can be deployed to platforms like Render, Railway, or AWS:

1. Build the TypeScript project:
   ```bash
   npm run build
   ```

2. Set the environment variables on your hosting platform.

3. Deploy the `dist` folder.

### Frontend Deployment
The frontend can be deployed to platforms like Vercel or Netlify:

1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting provider.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### User
- `GET /api/users/me` - Get current user profile (protected)
- `PUT /api/users/me` - Update user profile (protected)

### Flights
- `GET /api/flights/search` - Search flights with query parameters (from, to, date)
- `GET /api/flights/:id` - Get flight details by ID
- `POST /api/flights` - Create a new flight (protected)

## License
MIT
