class Store {
    state
    listeners = []
    moduleName = 'STORE'
    constructor() {
       LOG(`MOD`, `${this.moduleName}`, `Module Created`)
    }
    getState = () => this.state
    dispatch = (action) => {
        switch(action.type) {
            case 'items': 
                this.state = { ...this.state, ...{ ['items']: action.payload } }
                break
            default: 
                return this.state
        }
        this.listeners.forEach(notify => {
            notify()
        })
    }
}

export {
    Store
}