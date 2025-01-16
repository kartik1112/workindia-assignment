import crypt from "bcryptjs";
import db from "../initializers/db.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  console.log(req.body);

  const { name, email, password, role } = req.body;
  const hashedPassword = await crypt.hash(password, 10);

  try {
    await db.execute(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role || "user"]
    );
    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error registering user", error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (users.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = users[0];
    const match = await crypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: "Error logging in", error: err.message });
  }
};

const bookingDetails = async (req, res) => {
  const { userId, bookingId } = req.params;

  try {
    const [bookings] = await db.execute(
      "SELECT * FROM bookings WHERE id = ? AND user_id = ?",
      [bookingId, userId]
    );
    if (bookings.length === 0)
      return res.status(404).json({ message: "Booking not found" });

    res.json(bookings[0]);
  } catch (err) {
    res.status(400).json({
      message: "Error fetching booking details",
      error: err.message,
    });
  }
};

export { register, login, bookingDetails };
