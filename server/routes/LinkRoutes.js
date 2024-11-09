const express = require('express')
const {
	addLink,
	getLinks,
	getLinkById,
} = require('../controllers/linkController')
const router = express.Router()

router.post('/add', addLink)
router.get('/', getLinks)
router.get('/:id', getLinkById)

module.exports = router
