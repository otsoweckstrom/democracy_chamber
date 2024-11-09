const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String },
	url: { type: String, required: true, unique: true },
	createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Link', linkSchema)
