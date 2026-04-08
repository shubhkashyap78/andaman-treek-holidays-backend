import express from "express";
import mongoose from "mongoose";
import Ferry from "../models/Ferry.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

function ensureDb(req, res) {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({ error: "Database not connected" });
    return false;
  }
  return true;
}

router.get("/", async (req, res, next) => {
  try {
    if (!ensureDb(req, res)) return;
    const { q, type, limit = "10" } = req.query;
    const filter = {};
    if (q) filter.name = { $regex: String(q), $options: "i" };
    if (type) filter.type = String(type);
    const items = await Ferry.find(filter).sort({ createdAt: -1 }).limit(Number(limit));
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!ensureDb(req, res)) return;
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ error: "Invalid id" });
    const item = await Ferry.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    if (!ensureDb(req, res)) return;
    const created = await Ferry.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    if (!ensureDb(req, res)) return;
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ error: "Invalid id" });
    const updated = await Ferry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    if (!ensureDb(req, res)) return;
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ error: "Invalid id" });
    const deleted = await Ferry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
