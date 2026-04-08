import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import packagesRouter from "./routes/packages.js";
import activitiesRouter from "./routes/activities.js";
import islandsRouter from "./routes/islands.js";
import authRouter from "./routes/auth.js";
import authMiddleware from "./middleware/authMiddleware.js";
import honeymoonRouter from "./routes/honeymoon.js";
import familyRouter from "./routes/family.js";
import ltcRouter from "./routes/ltc.js";
import groupRouter from "./routes/group.js";
import ferryRouter from "./routes/ferry.js";

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "";

const allowedOrigins = [
  "http://localhost:5173",
  "https://treek-holidays.vercel.app",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(null, true); // allow all for now
  },
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "andaman-server" });
});

app.use("/api/auth", authRouter);
app.use("/api/packages", packagesRouter);
app.use("/api/activities", activitiesRouter);
app.use("/api/islands", islandsRouter);
app.use("/api/honeymoon", honeymoonRouter);
app.use("/api/family", familyRouter);
app.use("/api/ltc", ltcRouter);
app.use("/api/group", groupRouter);
app.use("/api/ferry", ferryRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

async function start() {
  if (!MONGODB_URI) {
    console.warn("MONGODB_URI not set. API will still run but DB features will fail.");
  } else {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();
