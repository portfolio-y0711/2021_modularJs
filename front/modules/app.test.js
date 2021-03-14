import { App } from './app.js'
global.LOG = () => undefined

describe('Component: App', () => {
    it('merge props from modules and inject it into store as initialState', () => {
        const app = new App() 
        const fakeModules = [
            { 
                props: { 
                    module1: 'prop1'
                }
            }, 
            { 
                props: { 
                    module2: 'prop2'
                }
            }
        ]
        app.injectModules(fakeModules)
        const stubStore = { state: undefined }
        app.injectStore(stubStore)
        app.start()
        expect([...Object.entries(stubStore.state)]).toEqual([['module1', 'prop1'], ['module2', 'prop2']])
    })
})
