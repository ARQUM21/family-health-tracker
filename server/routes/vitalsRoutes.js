import express from 'express'
import { addVitals, getVitals, deleteVitals } from '../controllers/vitalsController.js'
import authUser from '../middleware/authMiddleware.js'

const vitalsRouter = express.Router()

vitalsRouter.post('/add', authUser, addVitals)
vitalsRouter.post('/list', authUser, getVitals)
vitalsRouter.delete('/delete', authUser, deleteVitals)

export default vitalsRouter