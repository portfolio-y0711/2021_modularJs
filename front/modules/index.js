import { loader as bread } from './bread.js'
import { loader as finder } from './finder.js'

(() => {
    const app = window.APP
    if (app.appName === '2021_modular')  {
        [bread, finder].forEach(loader => {
            app.injectModuleLoader(loader)
        })
    }
})()