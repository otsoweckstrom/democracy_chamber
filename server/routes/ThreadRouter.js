const express = require('express')
const { newThread } = require('../controllers/ThreadController')
const { getThreads } = require('../controllers/ThreadController')
const router = express.Router()

router.post('/newThread', newThread)
router.get('/', getThreads)

module.exports = router
