import Vitals from '../models/vitals.js'

// Add Vitals
const addVitals = async (req, res) => {
    try {
        const { memberId, type, value, date, notes } = req.body

        if (!memberId || !type || !value || !date) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        const vitals = await Vitals.create({
            memberId,
            type,
            value,
            date,
            notes
        })

        res.json({ success: true, message: 'Vitals Added', vitals })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get Vitals by Member
const getVitals = async (req, res) => {
    try {
        const { memberId } = req.body

        const vitals = await Vitals.find({ memberId }).sort({ date: -1 })

        res.json({ success: true, vitals })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const deleteVitals = async (req, res) => {
    try {
        const { id } = req.body
        const vital = await Vitals.findByIdAndDelete(id)
        if (!vital) return res.json({ success: false, message: 'Vital Not Found' })
        res.json({ success: true, message: 'Vital Deleted' })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


export { addVitals, getVitals, deleteVitals }