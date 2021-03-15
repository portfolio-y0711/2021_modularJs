class PathHandler {
    self
    store
    moduleName = 'HANDLER'
    constructor() {
        this.self = this
        LOG(`MOD`, `${this.moduleName}`, `Module Created`)
    }
    async intoDir({ id, pathName }) {
        const { FINDER: { currentDir, parentDir }, BREAD: { pathQue, pathNameMap } } = store.getState()
        const items = await APIj.get(id)
        console.log(id)
        console.log(pathName)
    }

}

export {
    PathHandler
}