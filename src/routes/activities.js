import express from "express";
import mongoose from "mongoose";
import Activity from "../models/Activity.js";
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
    const { q, category, location, minPrice, maxPrice, tag, limit = "12" } = req.query;
    const filter = {};

    if (q) {
      filter.title = { $regex: String(q), $options: "i" };
    }
    if (category) {
      filter.category = String(category);
    }
    if (location) {
      filter.location = String(location);
    }
    if (tag) {
      filter.tags = String(tag);
    }
    if (minPrice || maxPrice) {
      filter.priceFrom = {};
      if (minPrice) filter.priceFrom.$gte = Number(minPrice);
      if (maxPrice) filter.priceFrom.$lte = Number(maxPrice);
    }

    const items = await Activity.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    if (!ensureDb(req, res)) return;
    const created = await Activity.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    if (!ensureDb(req, res)) return;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const updated = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    if (!ensureDb(req, res)) return;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const deleted = await Activity.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
