import express from 'express'
import { addMember, getMembers, editMember, deleteMember } from '../controllers/memberController.js'
import authUser from '../middleware/authMiddleware.js'

const memberRouter = express.Router()

memberRouter.post('/add', authUser, addMember)
memberRouter.get('/list', authUser, getMembers)
memberRouter.put('/edit', authUser, editMember)
memberRouter.delete('/delete', authUser, deleteMember)

export default memberRouter