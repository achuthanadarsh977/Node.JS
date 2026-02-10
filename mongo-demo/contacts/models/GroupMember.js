import mongoose from "mongoose";

const groupMemberSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "del"],
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

// Prevent duplicate memberships
groupMemberSchema.index({ group: 1, contact: 1 }, { unique: true });

const GroupMember = mongoose.model("GroupMember", groupMemberSchema);
export default GroupMember;
