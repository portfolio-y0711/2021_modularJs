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
            case 'intoDir':
                this.state = { ...this.state, ...{ items: action.payload.items, currentDir: action.payload.currentDir, parentDir: action.payload.parentDir, pathQue: action.payload.pathQue, pathNameMap: action.payload.pathNameMap } }
                break
            case 'outOfDir':
                this.state = { ...this.state, ...{ items: action.payload.items, currentDir: action.payload.currentDir, parentDir: action.payload.parentDir, pathQue: action.payload.pathQue, pathNameMap: action.payload.pathNameMap } }
                break
            case 'goto':
                this.state = { ...this.state, ...{ items: action.payload.items, currentDir: action.payload.currentDir, parentDir: action.payload.parentDir, pathQue: action.payload.pathQue, pathNameMap: action.payload.pathNameMap } }
                break
        }
        
        this.listeners.forEach(listener => {
            listener.props = this.state
            listener.render()
        })

    }
}

export {
    Store
}