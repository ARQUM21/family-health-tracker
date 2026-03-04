import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import User from '../models/user.js'

// Register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // Validation
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Enter a Valid Email' })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: 'Enter a Strong Password' })
        }

        // Check existing user
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: 'Email Already Registered' })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Save user
        const user = await new User({ name, email, password: hashedPassword }).save()

        // Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'User Does Not Exist' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid Credentials' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { register, login }