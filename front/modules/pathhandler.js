class PathHandler {
    self
    store
    moduleName = 'HANDLER'
    constructor(store) {
        this.self = this
        this.store = store
        LOG(`MOD`, `${this.moduleName}`, `Module Created`)
    }
    intoDir({ id, pathName }) {
        const items = await API.get(id)
        this.store.dispatch({ type: 'items', payload: items })
    }


}

export {
    PathHandler
}