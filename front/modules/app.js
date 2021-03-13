import { Bread, Finder } from './index.js'

class App {
    self
    modules
    constructor(modules) {
       this.self = this 
       this.modules = modules 
    }
    start() {

    }
}

window.APP = new App([ new Bread(), new Finder() ])