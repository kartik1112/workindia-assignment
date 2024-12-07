import db from "../initializers/db.js";

const addTrain = async (req, res) => {
  const { name, source, destination, seats_available } = req.body;

  try {
    await db.execute(
      "INSERT INTO trains (name, source, destination, seats_available) VALUES (?, ?, ?, ?)",
      [name, source, destination, seats_available]
    );
    res.status(201).json({ message: "Train added successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error adding train", error: err.message });
  }
};

export { addTrain };
