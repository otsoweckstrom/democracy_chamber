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

		res.json({
			message: 'Login successful',
			username: user.username,
			isAdmin: user.admin,
			isPoller: user.poller,
		}) // Include username and admin status
	} catch (error) {
		console.error('Login error:', error)
		res.status(500).json({ message: 'Server error' })
	}
}

exports.addpoller = async (req, res) => {
	try {
		const { isAdmin, userToPromote } = req.body

		if (!isAdmin) {
			return res.status(403).json({ message: 'Forbidden access' })
		}

		const user = await User.findOne({ userToPromote })
		if (!user) {
			return res
				.status(401)
				.json({ message: 'Target user does not exist' })
		}

		user.poller = true
		await user.save()

		res.status(201).json({ message: 'User promoted succesfully' })
	} catch (error) {
		console.error('Promotion error:', error)
		res.status(500).json({ message: 'Server error' })
	}
}
