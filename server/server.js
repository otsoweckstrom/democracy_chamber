const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const linkRouter = require('./routes/LinkRouter')
const userRouter = require('./routes/UserRouter')
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
	await createAdminUser();
	})
	.catch((error) => console.error('Error connecting to MongoDB:', error))

// Routes
app.use('/api/links', linkRouter)
app.use('/api/user', userRouter)

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
