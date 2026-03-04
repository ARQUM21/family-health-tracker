import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  relation: { type: String, required: true }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
}, { timestamps: true });

const Member = mongoose.model("member", memberSchema);

export default Member;