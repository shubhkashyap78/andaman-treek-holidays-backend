import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    jwt.verify(header.slice(7), process.env.JWT_SECRET || "changeme");
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
