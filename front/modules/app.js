import { Bread, Finder } from './index.js'

class App {
    self
    store
    modules
    constructor(modules) {
       this.self = this 
       this.modules = modules 
    }
    injectStore(store) {
        this.store = store
        return this
    }
    injectModules(modules) {
        this.modules = modules
        return this
    }
    start() {
        this.modules.forEach(module => {
            module.render()
        })
    }
}

export {
    App
}