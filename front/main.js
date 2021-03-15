import { App, Bread, Finder, Store, PathHandler } from './modules/index.js'
import { Api } from './adaptors/fakeapi.js'

const app = new App()
const api = new Api()
const store = new Store()
const handler = new PathHandler(store, api)

app
    .injectModules([ new Bread(handler), new Finder(handler) ])
    .injectStore(store)
    .injectApi(api)
    .start()

window.handler = handler