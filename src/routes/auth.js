import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  const validUser = process.env.ADMIN_USERNAME || "admin";
  const validPass = process.env.ADMIN_PASSWORD || "admin123";

  if (username !== validUser || password !== validPass) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET || "changeme", {
    expiresIn: "8h"
  });
  res.json({ token });
});

export default router;
