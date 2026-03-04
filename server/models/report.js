import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  labName: { type: String, required: true },
  hospital: { type: String, required: true },
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  memberId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "member", 
    required: true 
  }
}, { timestamps: true });

const Report = mongoose.model("report", reportSchema);

export default Report;