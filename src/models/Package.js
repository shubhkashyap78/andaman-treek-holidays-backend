import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    duration: { type: String, default: "" },
    category: { type: String, default: "" },
    priceFrom: { type: Number, default: 0 },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    location: { type: String, default: "" },
    tags: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("Package", packageSchema);
