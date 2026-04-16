import express from "express";
import mongoose from "mongoose";
import Contact from "../models/Contact.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { sendEnquiryNotification, sendThankYouEmail } from "../emailService.js";

const router = express.Router();

function ensureDb(req, res) {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({ error: "Database not connected" });
    return false;
  }
  return true;
}

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    if (!ensureDb(req, res)) return;
    const { status, limit = "50" } = req.query;
    const filter = {};
    if (status) filter.status = String(status);
    const items = await Contact.find(filter).sort({ createdAt: -1 }).limit(Number(limit));
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// Public endpoint - no auth required for contact form submission
router.post("/", async (req, res, next) => {
  try {
    if (!ensureDb(req, res)) return;
    
    // Save to database
    const created = await Contact.create(req.body);
    console.log('✅ Contact saved to database:', created._id);
    
    // Send email notifications (don't let email errors break the flow)
    try {
      // Send notification to admin
      await sendEnquiryNotification(req.body);
      
      // Send thank you email to customer
      await sendThankYouEmail(req.body);
    } catch (emailError) {
      console.error('⚠️ Email sending failed, but contact saved:', emailError.message);
      // Continue execution - database save was successful
    }
    
    res.status(201).json(created);
  } catch (err) {
    console.error('❌ Contact creation failed:', err);
    next(err);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    if (!ensureDb(req, res)) return;
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ error: "Invalid id" });
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
