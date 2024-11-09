const Link = require('../models/Link')

// Add a new Pol.is link
exports.addLink = async (req, res) => {
	try {
		const { title, description, url } = req.body
		const newLink = new Link({ title, description, url })
		await newLink.save()
		res.status(201).json({
			message: 'Link saved successfully',
			link: newLink,
		})
	} catch (error) {
		res.status(500).json({ message: 'Error saving link', error })
	}
}

// Get all Pol.is links
exports.getLinks = async (req, res) => {
	try {
		const links = await Link.find()
		res.status(200).json(links)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching links', error })
	}
}

// Get a single Pol.is link by ID
exports.getLinkById = async (req, res) => {
	try {
		const link = await Link.findById(req.params.id)
		if (!link) return res.status(404).json({ message: 'Link not found' })
		res.status(200).json(link)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching link', error })
	}
}
