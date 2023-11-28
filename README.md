# Petopia Backend

## Overview
Petopia is a backend application built on Node.js and Express.js to manage user authentication, pet listings, and user interactions with pets. It utilizes MongoDB for data storage using Mongoose as the ODM.

## Features
- **User Authentication**: Supports user signup, signin, and signout with validation for email, name, and password using Express Validator.
- **Pet Management**: Allows users to view all pets, add pets to favorites, and manage pet listings.
- **Routes**: Organized routes for user authentication, user actions, and pet-related functionalities.

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- Express Validator
- Crypto (for password encryption)

## Installation
1. Clone the repository: `git clone https://github.com/vishalbrdr/petopia-backend`
2. Install dependencies: `npm install`
3. Set up environment variables: Create a `.env` file based on the `.env.example` file and add necessary configuration details.

## Usage
1. Start the server: `npm start`
2. Access the application at `http://localhost:8000` (or respective port set in environment variables).

## Project Structure
├── controllers/
│ ├── authController.js
│ ├── petController.js
│ └── userController.js
├── models/
│ ├── petModel.js
│ └── userModel.js
├── routes/
│ ├── authRoutes.js
│ ├── petRoutes.js
│ └── userRoutes.js
├── .env
├── app.js
└── README.md


## Environment Variables
- `MONGO_URI`: MongoDB connection URI
- `SECRET`: Random Secret String

## API Endpoints
- **Authentication**:
  - `/api/signup`: POST - User signup
  - `/api/signin`: POST - User signin
  - `/api/signout`: GET - User signout
- **User Actions**:
  - `/api/user/:userId`: GET - Get user details
  - `/api/user/:userId/favorite-pets`: POST - Add pet to favorites
  - `/api/users/:userId/favorite-pets/:petId`: DELETE - Remove pet from favorites
- **Pet Management**:
  - `/api/pets`: GET - Get all pets
  - `/api/pets/:petId`: GET - Get pet by ID
  - `/api/pets/:userId`: POST - Add a new pet

## Authors
- Vishal Biradar
