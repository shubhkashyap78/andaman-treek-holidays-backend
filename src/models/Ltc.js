import mongoose from "mongoose";

const ltcSchema = new mongoose.Schema(
  {
    _id: { type: String },
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    duration: { type: String, default: "" },
    priceFrom: { type: Number, default: 0 },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    tags: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("Ltc", ltcSchema);
