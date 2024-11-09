const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const linkRouter = require('./routes/LinkRouter')
const bcrypt = require('bcrypt')
const ThreadRouter = require('./routes/ThreadRouter')
const createAdminUser = require('./createAdminUser')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(express.json())
app.use(cors())

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(async () => {
		console.log('Connected to MongoDB')
		await createAdminUser()
	})
	.catch((error) => console.error('Error connecting to MongoDB:', error))

// Routes
app.use('/api/links', linkRouter)

// User Schema (Mongoose Model)
const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

// API Routes

// Register
app.post('/api/register', async (req, res) => {
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
})

// Login
app.post('/api/login', async (req, res) => {
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
})
// Thread form
app.post('/api/new_thread', async (req, res) => {
	try {
		const { topic, description } = req.body
		const newThread = new Thread({ topic, description })
		await newThread.save()
		res.status(201).json({ message: 'Thread added succesfully' })
	} catch (error) {
		console.error('Error while creating thread')
		res.status(500).json({ message: 'Server error' })
	}
})

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
