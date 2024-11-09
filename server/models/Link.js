const { MongoServerClosedError } = require('mongodb')
const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String },
	url: { type: String, required: true, unique: true },
	createdAt: { type: Date, default: Date.now },
})

const threadSchema = new mongoose.Schema({
	title: {type: String, required: true},
	content: {type: String },

	comments : [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}],
	
	votes : [{
		upvoteCount: Number,
		downvoteCount: Number
	}]
})

const commentSchema = new mongoose.Schema({
	content: {type: String, required: true}
})


const Thread = mongoose.model('Thread', threadSchema)
const Comment = mongoose.model('Comment', commentSchema)
const Link = mongoose.model('Link', linkSchema)

module.exports = {Thread, Comment, Link};
