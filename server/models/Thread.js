const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema({
	topic: { type: String, required: true },
	description: { type: String, required: true },
	votes: { type: String, required: false},
	createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Thread', threadSchema)