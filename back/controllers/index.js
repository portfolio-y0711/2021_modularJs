const asyncHandler = require('./handler')
const pathService = require('../services/index')


const pathController = (service) => {
    const getPathHandler = async(httpRequest) => {
        const { id } = httpRequest.params
        let result
        try {
            result = await service.getPath(id)
        } catch(e) {
            console.log(e)
        }
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
}

module.exports = pathController(pathService)