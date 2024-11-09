const Thread = require('../models/Thread')

exports.newThread = async (req, res) => {
	try {
		console.log('Request Body:', req.body)
		const { topic, description, votes } = req.body

		const newThread = new Thread({ topic, description, votes })
		await newThread.save()

		res.status(201).json({
			message: 'Thread saved successfully',
			thread: newThread,
		})
	} catch (error) {
		console.error('Error saving thread:', error)
		res.status(500).json({
			message: 'Error saving thread',
			error: error.message,
		})
	}
}
