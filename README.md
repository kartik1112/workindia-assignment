﻿# Train Booking System

This is a Train Booking System built with Node.js, Express, and MySQL. It allows users to register, login, check seat availability, book seats, and view booking details. Admin users can add new trains to the system.


## Setup

1. Clone the repository.
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file in the root directory with the following content:
    ```
    DB_HOST=your_db_host
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_PORT=your_db_port
    DB_NAME=your_db_name
    JWT_SECRET=your_jwt_secret_key
    PORT=your_server_port
    ```
4. Start the server:
    ```sh
    npm start
    ```

## API Endpoints

### User Endpoints

- **Register User**
    - `POST /users/register`
    - Request Body: `{ "name": "test", "email": "test1@gmail.com", "password": "123456", "role": "admin" }`
    - Request Body: `{ "name": "test2", "email": "test2@gmail.com", "password": "123456", "role": "user" }`

- **Login User**
    - `POST /users/login`
    - Request Body: `{ "email": "test1@gmail.com", "password": "123456" }`

- **Get Booking Details**
    - `GET /users/:userId/bookings/:bookingId`
    - Headers: `{ "Authorization": "JWT Token recieved from login" }`

### Train Endpoints

- **Add a New Train (Admin Restricted)**
    - `POST /admin/trains`
    - Headers: `{ "Authorization": "JWT Token recieved from login" }`
    - Request Body: `{ "name": "Express Train", "source": "City A", "destination": "City B", "seats_available": 100 }`

- **Get Seat Availability**
    - `GET /trains/availability`
    - Query Params: `?source=City A&destination=City B`

- **Book a Seat**
    - `POST /trains/:trainId/book`
    - Headers: `{ "Authorization": "JWT Token recieved from login" }`
    - Request Body: `{ "seat_count": 2 }`

## Middleware

- **Authentication**
    - Located in [utils/authutils.js](utils/authutils.js)
    - Function: `authenticate`

- **Authorization**
    - Located in [middleware/auth.js](middleware/auth.js)
    - Function: `isAdmin`

## Controllers

- **User Controller**
    - Located in [controllers/userController.js](controllers/userController.js)
    - Functions: `register`, `login`, `bookingDetails`

- **Train Controller**
    - Located in [controllers/trainController.js](controllers/trainController.js)
    - Function: `addTrain`

- **Seats Controller**
    - Located in [controllers/seatsController.js](controllers/seatsController.js)
    - Functions: `availableSeats`, `bookSeat`

## Database

- **Database Initialization**
    - SQL file located in [initializers/database.sql](initializers/database.sql)
    - Database connection and initialization script located in [initializers/db.js](initializers/db.js)
 ## SAMPLE .ENV IS AVAILABLE IN /root DIRECTORY 
