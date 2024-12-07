import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    console.log(e + " error");

    res.status(401).json({ message: "Invalid token" });
  }
};
