const express = require('express')
const { newThread } = require('../controllers/ThreadController')
const router = express.Router()

router.post('/newThread', newThread)

module.exports = router
