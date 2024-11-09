const Thread = require('../models/Thread')

// Add a new thread
exports.newThread = async (req, res) => {
	try {
		const { topic, description, votes } = req.body
		const newThread = new Thread({ topic, description, votes })
		await newThread.save()

		res.status(201).json({message: 'Thread saved successfully'});
	} catch (error) {
		res.status(500).json({ message: 'Error saving thread', error });
	}
};
