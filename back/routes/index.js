const express = require('express')
const router = express.Router()
const pathController = require('../controllers')



router.get('/path/:id', pathController.getPath)

module.exports = router