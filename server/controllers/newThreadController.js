const Link = require('../models/Link')

// Add a new thread
exports.addLink = async (req, res) => {
	try {
		const { topic, description, url } = req.body
		const newThread = new Thread({ topic, description, url })
		await newLink.save()
		res.status(201).json({
			message: 'Thread saved successfully',
			thread: newThread,
		})
	} catch (error) {
		res.status(500).json({ message: 'Error saving link', error })
	}
}

