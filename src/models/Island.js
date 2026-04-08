import mongoose from "mongoose";

const islandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String, default: "" },
    image: { type: String, default: "" },
    description: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    tags: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("Island", islandSchema);
