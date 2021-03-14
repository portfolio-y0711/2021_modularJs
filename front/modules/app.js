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
        const initialState = this.modules.reduce((acc, module) => {
            return Object.assign(acc, module.props)
        }, {})
        this.store.state = initialState
        this.modules.forEach(module => { 
            if (Object.getPrototypeOf(module).hasOwnProperty('componentDidMount')) {
                module.componentDidMount()
            }
            module.render() 
        })
    }
}

export {
    App
}