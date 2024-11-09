const Thread = require('../models/Thread')

exports.newThread = async (req, res) => {
	try {
		const { topic, description, votes } = req.body
		const newThread = new Thread({ topic, description, votes })
		await newThread.save()

		res.status(201).json({ message: 'Thread saved successfully' })
	} catch (error) {
		res.status(500).json({ message: 'Error saving thread', error })
	}
};


// Pulls a list of threads from MongoDB
exports.getThreads = async (req, res) => {
	try {
		const threads = await Thread.find()
		res.status(200).json(threads)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching threads', error })
	}
}
