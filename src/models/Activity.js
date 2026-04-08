import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: "" },
    priceFrom: { type: Number, default: 0 },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    duration: { type: String, default: "" },
    location: { type: String, default: "" },
    tags: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);
