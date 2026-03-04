import Report from '../models/report.js'
import AiInsight from '../models/aiInsight.js'
import analyzeReport from '../config/gemini.js'

const analyzeReportWithAI = async (req, res) => {
    try {
        const { reportId } = req.body

        if (!reportId) {
            return res.json({ success: false, message: 'Report ID Required' })
        }

        const report = await Report.findById(reportId)
        if (!report) {
            return res.json({ success: false, message: 'Report Not Found' })
        }

        const existingInsight = await AiInsight.findOne({ reportId })
        if (existingInsight && existingInsight.status === 'done') {
            return res.json({ 
                success: true, 
                message: 'Already Analyzed', 
                insight: existingInsight 
            })
        }

        let insight = await AiInsight.findOne({ reportId })
        if (!insight) {
            insight = await AiInsight.create({ reportId, status: 'pending' })
        } else {
            insight.status = 'pending'
            await insight.save()
        }

        console.log('Starting Gemini Analysis...')

        const geminiResponse = await analyzeReport(report.image, {
            title: report.title,
            labName: report.labName,
            hospital: report.hospital,
            doctor: report.doctor,
            date: report.date
        })

        console.log('Gemini Response:', geminiResponse)

        const jsonMatch = geminiResponse.match(/\{[\s\S]*\}/)
        
        if (!jsonMatch) {
            throw new Error('Invalid response from Gemini')
        }

        const analysisData = JSON.parse(jsonMatch[0])

        insight.englishSummary = analysisData.englishSummary || "Analysis not available"
        insight.urduSummary = analysisData.urduSummary || "Tafseel uplabdh nahi"
        insight.doctorQuestions = analysisData.doctorQuestions || []
        insight.foodAdvice = analysisData.foodAdvice || ["Consult your doctor"]
        insight.homeRemedies = analysisData.homeRemedies || ["Consult your doctor"]
        insight.status = 'done'
        insight.reportStatus = analysisData.reportStatus || "normal"

        await insight.save()

        res.json({ 
            success: true, 
            message: 'Analysis Complete', 
            insight 
        })

    } catch (error) {
        console.log('Error:', error)
        
        if (req.body.reportId) {
            await AiInsight.findOneAndUpdate(
                { reportId: req.body.reportId },
                { status: 'failed' }
            )
        }

        res.json({ success: false, message: error.message })
    }
}

const getInsightsByReports = async (req, res) => {
    try {
        const { reportIds } = req.body
        const insights = await AiInsight.find({ 
            reportId: { $in: reportIds },
            status: 'done'
        })
        res.json({ success: true, insights })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export { analyzeReportWithAI, getInsightsByReports }