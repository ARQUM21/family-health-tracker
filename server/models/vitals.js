import mongoose from "mongoose";

const vitalsSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "member", required: true },
  type: { type: String, required: true },
  value: { type: String, required: true },
  date: { type: Date, required: true },
  notes: { type: String }
}, { timestamps: true });

const Vitals = mongoose.model("vitals", vitalsSchema);

export default Vitals;