import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    packageType: { type: String, default: "" },
    travelMonth: { type: String, default: "" },
    numberOfTravelers: { type: Number, default: 1 },
    message: { type: String, default: "" },
    status: { type: String, default: "new", enum: ["new", "contacted", "closed"] }
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
