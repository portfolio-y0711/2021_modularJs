class Store {
    state
    moduleName = 'STORE'
    constructor() {
       LOG(`MOD`, `${this.moduleName}`, `Module Created`)
    }
    getState = () => this.state
}

export {
    Store
}