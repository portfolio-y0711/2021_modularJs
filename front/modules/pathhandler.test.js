import { PathHandler } from './pathhandler.js'
import { Api } from '../adaptors/fakeapi.js'
import { Store } from './store.js'
global.LOG = () => undefined
global.API = new Api()

describe('Handler: pathhandler', () => {
    beforeEach(() => {
    })

    describe('when handler.intoDir() called', () => {
        it('it will invoke store.dispatch()', async() => {
            const mockDispatch = jest.fn()
            const store = { dispatch: mockDispatch, state: { currentDir: undefined, parentDir: undefined }, getState: () => ({ currentDir: undefined }) }
            const pathhandler = new PathHandler(store)
            await pathhandler.intoDir({ id: 0, pathName: 'Root'})
            expect(mockDispatch).toHaveBeenCalled()
        })


    })
})
