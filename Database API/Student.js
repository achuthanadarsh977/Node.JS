import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});

export default mongoose.model("Student", studentSchema);
