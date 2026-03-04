import express from 'express'
import { analyzeReportWithAI, getInsightsByReports } from '../controllers/aiController.js'
import authUser from '../middleware/authMiddleware.js'

const aiRouter = express.Router()

aiRouter.post('/analyze', authUser, analyzeReportWithAI)
aiRouter.post('/list', authUser, getInsightsByReports)

export default aiRouter