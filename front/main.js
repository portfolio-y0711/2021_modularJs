import { App, Bread, Finder, Store } from './modules/index.js'

const app = new App()

app
.injectStore(new Store())
.injectModules([ new Bread(), new Finder() ])
.start()