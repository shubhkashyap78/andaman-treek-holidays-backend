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
    tags: { type: [String], default: [] },
    itinerary: {
      type: [{
        day: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, default: "" },
        activities: { type: [String], default: [] },
        meals: { type: [String], default: [] },
        accommodation: { type: String, default: "" },
        transport: { type: String, default: "" }
      }],
      default: []
    },
    inclusions: { type: [String], default: [] },
    exclusions: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("Honeymoon", honeymoonSchema);
