import mongoose from "mongoose";

const aiInsightSchema = new mongoose.Schema({
  reportId: { type: mongoose.Schema.Types.ObjectId, ref: "report", required: true },
  englishSummary: { type: String },
  urduSummary: { type: String },
  doctorQuestions: [{ type: String }],
  foodAdvice: [{ type: String }],      
  homeRemedies: [{ type: String }],
  disclaimer: { type: String, default: "AI sirf samajhne ke liye hai, doctor se zaroor milo!" },
  reportStatus: {                   
        type: String,
        enum: ["normal", "warning", "critical"],
        default: null
    },
  status: { 
    type: String, 
    enum: ["pending", "done", "failed"], 
    default: "pending" 
  }
}, { timestamps: true });

const AiInsight = mongoose.model("AiInsight", aiInsightSchema);

export default AiInsight;