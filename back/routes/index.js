const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

router.get('/path/:id', async(req, res) => {
    const { id } = req.params
    let queryString
    switch(id) {
        case '0': 
            queryString = 'queryRoot'
            break
        default:
            queryString = `query${id}`
            break
    }
    const data = fs.readFileSync(path.join(__dirname, '../data/files.json'), 'utf-8')
    const result = await new Promise(res => setTimeout(res, 1000, (JSON.parse(data)[`${queryString}`])))
    res.json(result)
})

module.exports = router