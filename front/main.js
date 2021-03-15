import { App, Bread, Finder, Store, PathHandler } from './modules/index.js'

const app = new App()
let store

app
    .injectModules([ new Bread(), new Finder() ])
    .injectStore(store = new Store())
    .start()

window.handler = new PathHandler(store)