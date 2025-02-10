# Basic CRUD Application

This is a simple CRUD (Create, Read, Update, Delete) application built using Express.js and React.

## Features
- Create a new user
- Read all users
- Update an existing user
- Delete a user

## Technologies Used
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React.js, React Router
- **Other**: Bootstrap for styling, Framer Motion for animations

## Installation

1. Clone this repository:
   git clone https://github.com/AfreenInnovates/Web-Development-Projects.git
   cd basic-CRUD

2. Install dependencies for both frontend and backend:
   ### Backend
   cd backend
   npm install
   
   ### Frontend
   cd frontend
   npm install

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following:
     URI=your_mongodb_connection_string
     PORT=port_number

4. Start the backend server:
   cd backend
   npm start

5. Start the frontend application:
   cd frontend
   npm start

## API Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all users |
| POST | `/` | Create a new user |
| GET | `/:id` | Get a single user by ID |
| PATCH | `/:id` | Update a user |
| DELETE | `/:id` | Delete a user |

## Demo
You can watch the demo video below:

![Demo Video](basic-CRUD.mp4)

## License
This project is licensed under the MIT License.
