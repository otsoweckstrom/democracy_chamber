const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const linkRoutes = require('./routes/linkRoutes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(express.json())

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to MongoDB'))
	.catch((error) => console.error('Error connecting to MongoDB:', error))

// Routes
app.use('/api/links', linkRoutes)

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
