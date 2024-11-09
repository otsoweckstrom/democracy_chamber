const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	votes: { type: String, required: false },
	createdAt: { type: Date, default: Date.now },
})

const Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread
