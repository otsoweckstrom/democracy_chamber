const express = require('express')
const { newThread } = require('../controllers/newThreadController')
const router = express.Router()

router.post('/add', newThread)

module.exports = router
