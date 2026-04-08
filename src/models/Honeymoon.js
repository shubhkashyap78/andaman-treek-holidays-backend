import mongoose from "mongoose";

const honeymoonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    duration: { type: String, default: "" },
    priceFrom: { type: Number, default: 0 },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    offer: { type: String, default: "" },
    tags: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("Honeymoon", honeymoonSchema);
