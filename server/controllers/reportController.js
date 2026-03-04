import Report from '../models/report.js'
import { v2 as cloudinary } from 'cloudinary'

// Upload Report
const uploadReport = async (req, res) => {
    try {
        const { title, labName, hospital, doctor, date, price, memberId } = req.body
        
          console.log('Body:', req.body)      // ✅ Add
        console.log('File:', req.file) 
        const imageFile = req.file

        if (!title || !labName || !hospital || !doctor || !date || !price || !memberId || !imageFile) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const report = await Report.create({
            memberId,
            title,
            labName,
            hospital,
            doctor,
            date,
            price,
            image: imageUpload.secure_url
        })

        res.json({ success: true, message: 'Report Uploaded', report })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get Reports by Member
const getReports = async (req, res) => {
    try {
        const { memberId } = req.body

        const reports = await Report.find({ memberId })

        res.json({ success: true, reports })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Delete Report
const deleteReport = async (req, res) => {
    try {
        const { id } = req.body

        const report = await Report.findByIdAndDelete(id)

        if (!report) {
            return res.json({ success: false, message: 'Report Not Found' })
        }

        res.json({ success: true, message: 'Report Deleted' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const getReport = async (req, res) => {
    try {
        const { reportId } = req.body
        const report = await Report.findById(reportId)
        if (!report) return res.json({ success: false, message: 'Report Not Found' })
        res.json({ success: true, report })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export { uploadReport, getReports, deleteReport, getReport }