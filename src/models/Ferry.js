import mongoose from "mongoose";

const ferrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, default: "" },
    description: { type: String, default: "" },
    duration: { type: String, default: "" },
    image: { type: String, default: "" },
    features: { type: [String], default: [] },
    priceFrom: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Ferry", ferrySchema);
