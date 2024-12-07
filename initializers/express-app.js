import express, { json } from "express";
import { authenticate } from "../utils/authutils.js";
import { isAdmin } from "../middleware/auth.js";

import {
  bookingDetails,
  login,
  register,
} from "../controllers/userController.js";
import { addTrain } from "../controllers/trainController.js";
import { availableSeats, bookSeat } from "../controllers/seatsController.js";

const app = express();
app.use(json());
// Reqister User
app.post("/users/register", register);

// Login User
app.post("/users/login", login);

// Add a New Train (Admin Restricted)
app.post("/admin/trains", authenticate, isAdmin, addTrain);

// Get Seat Availability
app.get("/trains/availability", availableSeats);

// Book a Seat
app.post("/trains/:trainId/book", authenticate, bookSeat);

// Get Booking Details
app.get("/users/:userId/bookings/:bookingId", authenticate, bookingDetails);

export default app;
