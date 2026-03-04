import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeReport(fileUrl, reportDetails) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Cloudinary URL se file download karo
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' })
    const base64Data = Buffer.from(response.data).toString('base64')
    
    // Content type detect karo
    const contentType = fileUrl.includes('.pdf') ? 'application/pdf' : 'image/jpeg'

     const prompt = `You are a medical AI assistant. Analyze this medical report.

Report Details:
- Title: ${reportDetails.title}
- Lab: ${reportDetails.labName}
- Hospital: ${reportDetails.hospital}
- Doctor: ${reportDetails.doctor}
- Date: ${reportDetails.date}

Return ONLY valid JSON — no extra text:
{
  "englishSummary": "2-3 sentence simple explanation of results",
  "urduSummary": "roman urdu mein 2-3 sentence asan explanation",
  "doctorQuestions": ["Q1", "Q2", "Q3", "Q4", "Q5"],
  "foodAdvice": ["Eat more green vegetables like spinach", "Avoid processed and oily food", "Drink 8 glasses of water daily", "Include fruits rich in Vitamin C"],
  "homeRemedies": ["Mix 1 tsp honey in warm water every morning", "Do 30 minutes walk daily", "Sleep 7-8 hours every night", "Avoid stress and practice deep breathing"],
  "reportStatus": "normal"
}

Rules:
- foodAdvice: array of 4-5 specific actionable points
- homeRemedies: array of 4-5 specific actionable points  
- reportStatus: "normal" | "warning" | "critical"
- normal   = all values in range
- warning  = some values slightly off
- critical = values significantly abnormal`

    // File base64 ke sath bhejo
    const result = await model.generateContent([
        {
            inlineData: {
                mimeType: contentType,
                data: base64Data
            }
        },
        prompt
    ])

    const res = await result.response
    return res.text()
}

export default analyzeReport
