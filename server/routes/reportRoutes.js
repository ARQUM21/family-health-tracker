import express from 'express'
import { uploadReport, getReports, deleteReport, getReport } from '../controllers/reportController.js'
import authUser from '../middleware/authMiddleware.js'
import upload from '../config/multer.js'

const reportRouter = express.Router()

reportRouter.post('/upload', authUser, upload.single('image'), uploadReport)
reportRouter.post('/list', authUser, getReports)
reportRouter.delete('/delete', authUser, deleteReport)
reportRouter.post('/get', authUser, getReport)


export default reportRouter