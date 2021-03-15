import { App, Bread, Finder, Store, PathHandler } from './modules/index.js'

const app = new App()

app
    .injectModules([ new Bread(), new Finder() ])
    .injectStore(new Store())
    .start()

window.handler = new PathHandler()