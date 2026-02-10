import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["TRIAL", "ACTIVE", "SUSPENDED"],
      default: "TRIAL",
    },
    expiryDate: {
      type: Date,
      default: () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
