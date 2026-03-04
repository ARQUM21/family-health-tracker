import Member from '../models/member.js'

// Add Member
const addMember = async (req, res) => {
    try {
        const { name, age, relation } = req.body
        const userId = req.user.userId  // middleware se aaya

        if (!name || !age || !relation) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        const member = await new Member({
            userId,
            name,
            age,
            relation
        }).save()

        res.json({ success: true, message: 'Member Added', member })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get All Members
const getMembers = async (req, res) => {
    try {
        const userId = req.user.userId

        const members = await Member.find({ userId })

        res.json({ success: true, members })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Edit Member
const editMember = async (req, res) => {
    try {
       
        const { id, name, age, relation } = req.body
        const userId = req.user.userId

        const member = await Member.findOneAndUpdate(
            { _id: id, userId },
            { name, age, relation },
            { new: true }
        )

        if (!member) {
            return res.json({ success: false, message: 'Member Not Found' })
        }

        res.json({ success: true, message: 'Member Updated', member })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Delete Member
const deleteMember = async (req, res) => {
    try {
        const { id } = req.body
        const userId = req.user.userId

        const member = await Member.findOneAndDelete({ _id: id, userId })
        if (!member) {
            return res.json({ success: false, message: 'Member Not Found' })
        }

        res.json({ success: true, message: 'Member Deleted' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addMember, getMembers, editMember, deleteMember }