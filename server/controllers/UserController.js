const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
	try {
		const { username, password } = req.body

		// Check if user already exists
		const existingUser = await User.findOne({ username })
		if (existingUser) {
			return res.status(400).json({ message: 'Username already exists' })
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10) // 10 is the salt rounds

		// Create new user
		const newUser = new User({ username, password: hashedPassword })
		await newUser.save()

		res.status(201).json({ message: 'User registered successfully' })
	} catch (error) {
		console.error('Registration error:', error)
		res.status(500).json({ message: 'Server error' })
	}
}

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body

		const user = await User.findOne({ username })
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' })
		}

		// Compare passwords
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials' })
		}

		// In a real application, you would generate a JWT or session here
		// For simplicity, just sending a success message
		res.json({ message: 'Login successful', username: user.username }) // Include username
	} catch (error) {
		console.error('Login error:', error)
		res.status(500).json({ message: 'Server error' })
	}
}