import express from "express";
import mongoose from "mongoose";
import Island from "../models/Island.js";
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
    const { q, tag, limit = "12" } = req.query;
    const filter = {};

    if (q) {
      filter.name = { $regex: String(q), $options: "i" };
    }
    if (tag) {
      filter.tags = String(tag);
    }

    const items = await Island.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (!ensureDb(req, res)) return;
    const item = await Island.findOne({ _id: req.params.id });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    if (!ensureDb(req, res)) return;
    const count = await Island.countDocuments();
    const _id = `i${count + 1}`;
    const created = await Island.create({ _id, ...req.body });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    if (!ensureDb(req, res)) return;
    const updated = await Island.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    if (!ensureDb(req, res)) return;
    const deleted = await Island.findOneAndDelete({ _id: req.params.id });
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
