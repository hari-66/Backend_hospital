import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: String,
    otp: Number,
    expiresAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("Otp", otpSchema);
