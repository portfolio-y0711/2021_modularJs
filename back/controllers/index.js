const fs = require('fs')
const path = require('path')
const asyncHandler = require('./handler')

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

module.exports = pathController