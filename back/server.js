const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', require('./routes'))
app.use('/assets/', express.static(path.join(__dirname, './data/assets')))

module.exports = app