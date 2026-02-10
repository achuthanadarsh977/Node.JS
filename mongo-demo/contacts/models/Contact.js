import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true, maxlength: 50 },
    phone: { type: String, trim: true, maxlength: 20, default: "" },
    email: { type: String, trim: true, maxlength: 50, default: "" },
    address: { type: String, trim: true, default: "" },
    company: { type: String, trim: true, maxlength: 100, default: "" },
    jobtitle: { type: String, trim: true, maxlength: 100, default: "" },
    website: { type: String, trim: true, maxlength: 100, default: "" },
    status: {
      type: String,
      enum: ["active", "del", "permadel"],
      default: "active",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
