const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(cors())
app.use(express.json())

// Define the API route
app.get('/api', (req, res) => {
	res.json({ message: 'Hello from the Node.js backend!' })
})

// Serve the React frontend (only for production)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../app/build')))

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../app/build/index.html'))
	})
}

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
