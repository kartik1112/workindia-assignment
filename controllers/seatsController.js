import db from "../initializers/db.js";

const availableSeats = async (req, res) => {
  const { source, destination } = req.query;

  try {
    const [trains] = await db.execute(
      "SELECT * FROM trains WHERE source = ? AND destination = ?",
      [source, destination]
    );
    res.json(trains);
  } catch (err) {
    res.status(400).json({
      message: "Error fetching seat availability",
      error: err.message,
    });
  }
};

const bookSeat = async (req, res) => {
  const { trainId } = req.params;
  const { seat_count } = req.body;

  try {
    const [trains] = await db.execute("SELECT * FROM trains WHERE id = ?", [
      trainId,
    ]);
    if (trains.length === 0)
      return res.status(404).json({ message: "Train not found" });

    const train = trains[0];
    if (train.seats_available < seat_count) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    await db.execute(
      "UPDATE trains SET seats_available = seats_available - ? WHERE id = ?",
      [seat_count, trainId]
    );
    await db.execute(
      "INSERT INTO bookings (user_id, train_id, seat_count) VALUES (?, ?, ?)",
      [req.user.id, trainId, seat_count]
    );
    res.json({ message: "Seat booked successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error booking seat", error: err.message });
  }
};
export { availableSeats, bookSeat };
