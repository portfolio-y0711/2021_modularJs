import { PathHandler } from './handler.js'
import { Api } from '../adaptors/fakeapi.js'
import { Store } from './store.js'
global.LOG = () => undefined

describe('Handler: pathhandler', () => {

    describe('when handler.intoDir() called', () => {
        it('it will invoke store.dispatch()', async() => {
            const mockDispatch = jest.fn()
            const store = (() => { 
                let state = { currentDir: undefined, parentDir: undefined, pathQue: [], pathNameMap: {} }
                return ({
                    dispatch: mockDispatch, 
                    getState: () => state 
                })
            })()
            const api = new Api()
            const pathhandler = new PathHandler(store, api)
            await pathhandler.intoDir({ id: 0, pathName: 'Root'})
            expect(mockDispatch).toHaveBeenCalled()
        })
    })

    describe('when handler.outOfDir() called', () => {
        it('it will invoke store.dispatch()', async() => {
            const mockDispatch = jest.fn()
            const store = (() => { 
                let state = { currentDir: 1, parentDir: 0, pathQue: [], pathNameMap: {} }; 
                return ({ dispatch: mockDispatch, getState: () => state })
            })()
            const api = new Api()
            const pathhandler = new PathHandler(store, api)
            await pathhandler.outOfDir()
            expect(mockDispatch).toHaveBeenCalled()
        })
    })
})
