const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

const asyncHandler = (promisify) => async(req, res) => {
    const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        // ip: req.ip,
        // method: req.path,
        // headers: {
        //     "Content-Type": req.get("Content-Type"),
        //     Referer: req.get("referer"),
        //     "User-Agent": req.get("User-Agent"),
        //     Cookie: req.get("Authorization"),
        //     "Access-Control-Allow-Origin": "*"
        // }
    }
    return promisify(httpRequest)
        .then(httpResponse => {
            if (httpResponse.headers) {
                res.set("Access-Control-Allow-Origin", "*");
                res.set(httpResponse.headers);
            }
            res.type("json");
            res.status(httpResponse.statusCode)
                .send(httpResponse.body)
            
        }).catch((e) => {
            res.sendStatus(500)
        })

}

const pathController = (() => {
    const getPathHandler = async(httpRequest) => {
        const { id } = httpRequest.params
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
        const httpResponse = {
            headers: {
                "Content-Type": "application/json",
            },
            statusCode: 200,
            body: result
        }
        return httpResponse
    }
    const getPath = asyncHandler(getPathHandler)
    return {
        getPath
    }
})()

router.get('/path/:id', pathController.getPath)

module.exports = router