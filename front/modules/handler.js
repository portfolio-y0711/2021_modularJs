class PathHandler {
    self
    store
    api
    moduleName = 'HANDLER'
    constructor(store, api) {
        this.self = this
        this.store = store
        this.api = api
        LOG(`MOD`, `${this.moduleName}`, `Module Created`)
    }
    async intoDir({ id, pathName }) {
        const { currentDir, pathQue, pathNameMap } = this.store.getState()
        const items = await this.api.get(id)

        this.store.dispatch({
            type: 'intoDir',
            payload: {
                currentDir: id,
                parentDir: currentDir,
                items: [...items],
                pathQue: [...pathQue, id],
                pathNameMap: { ...pathNameMap, ...{ [`${id}`]: pathName } }
            }
        })
        const { currentDir: _currentDir, parentDir: _parentDir, pathQue: _pathQue, pathNameMap: _pathNameMap } = this.store.getState()
        LOG('','', `\n# intoDir()\n\ncurrentDir: ${_currentDir}\nparentDir: ${_parentDir}\npathQue: ${_pathQue}\npathNameMap: ${JSON.stringify(_pathNameMap)}`)
    }
    async outOfDir() {
        const { currentDir, parentDir, pathQue, pathNameMap } = this.store.getState()
        if (parentDir === undefined || currentDir === 0) {
            return
        }
        const items = await this.api.get(parentDir)
        const keyToDelete = pathQue.pop()
        delete pathNameMap[keyToDelete]

        this.store.dispatch({
            type: 'outOfDir',
            payload: {
                currentDir: parentDir,
                parentDir: pathQue[pathQue.length - 2],
                items: [...items],
                pathQue: pathQue,
                pathNameMap: pathNameMap
            }
        })

        const { currentDir: _currentDir, parentDir: _parentDir, pathQue: _pathQue, pathNameMap: _pathNameMap } = this.store.getState()
        LOG('','', `\n# outOfDir()\n\ncurrentDir: ${_currentDir}\nparentDir: ${_parentDir}\npathQue: ${_pathQue}\npathNameMap: ${JSON.stringify(_pathNameMap)}`)
    }
    async goto(id) {
        const { currentDir, parentDir, pathQue, pathNameMap } = this.store.getState()
        if (pathQue.length === 1 || id === currentDir) {
            return
        }
        const idx = pathQue.findIndex(e => e === id)
        const items = await this.api.get(id)
        const [ newPathQue, pathQueToDelete ] = [ pathQue.slice(0, idx + 1), pathQue.slice(idx + 1) ]

        pathQueToDelete.forEach(pathName => {
            delete pathNameMap[pathName]
        })

        this.store.dispatch({
            type: 'goto',
            payload: {
                currentDir: id,
                parentDir: newPathQue[newPathQue.length - 2],
                items: items,
                pathQue: [...newPathQue],
                pathNameMap: pathNameMap
            }
        })

        const { currentDir: _currentDir, parentDir: _parentDir, pathQue: _pathQue, pathNameMap: _pathNameMap } = this.store.getState()
        LOG('','', `\n# goto(${id})\n\ncurrentDir: ${_currentDir}\nparentDir: ${_parentDir}\npathQue: ${_pathQue}\npathNameMap: ${JSON.stringify(_pathNameMap)}`)
    }

    async openFile(id) {
        const { currentDir } = this.store.getState()
        const file = (await this.api.get(currentDir)).filter(file => file.id === parseInt(id))[0]
        const blob = await this.api.getFile(file.filepath) 
        return blob
    }
}

export {
    PathHandler
}