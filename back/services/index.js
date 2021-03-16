const fs = require('fs')
const path = require('path')

const pathService = (() => {
    const getPath = async(id) => {
        // createDB
        const data = fs.readFileSync(path.join(__dirname, '../data/files.json'), 'utf-8')

        // query
        let queryString
        switch(id) {
            case '0': 
                queryString = 'queryRoot'
                break
            default:
                queryString = `query${id}`
                break
        }
        return await new Promise(res => setTimeout(res, 1000, (JSON.parse(data)[`${queryString}`])))
    }
    return {
        getPath
    }
})()
        
module.exports = pathService