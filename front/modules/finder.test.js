import { expect, jest } from '@jest/globals'
import { Finder } from './finder.js'
const path = require('path')
const fs = require('fs')
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
global.LOG = () => undefined

describe('Component: Finder', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString()
    })
    it('finder component has render()', () => {
        const finder = new Finder()
        expect(Object.getPrototypeOf(finder).hasOwnProperty('render')).toBeTruthy()
    })
    it('finder component has props', () => {
        const finder = new Finder()
        expect(finder.hasOwnProperty('props')).toBeTruthy()
    })
    describe('when props are not given', () => {
        it('finder component do not render', () => {
            const finder = new Finder()
            finder.render()
            const finderView = document.querySelector('finder')
            expect(finderView.innerHTML.length).toEqual(0)
        })
        it('finder component render div items with .folder & .file ', () => {
            const finder = new Finder()
            finder.props = {
                items: [ 
                    { id: 1, type: 'DIRECTORY', title: 'monorepo', filepath: null, parent: 0 }, 
                    { id: 4, type: 'FILE', title: 'mono.png', filepath: './assets/mono.png', parent: 1 }, 
                ],
                parentDir: 0
            }
            finder.render()
            const folderlists = document.querySelectorAll('finder .folder')
            const filelists = document.querySelectorAll('finder .file')
            expect([...folderlists].length).toEqual(1)
            expect([...filelists].length).toEqual(1)
        })

        it('finder component render elem with #revert', () => {
            const finder = new Finder()
            finder.props = {
                items: [ { id: 1, type: 'DIRECTORY', title: 'monorepo', filepath: null, parent: 0 } ],
                parentDir: 0
            }
            finder.render()
            const revert = document.querySelector('finder #revert')
            expect(revert.id).toEqual('revert')
        })
    })
    describe('when finder component mounted', () => {
        it('it will fetch items from global API object', () => {
            const finder = new Finder()
            const mockApiGet = jest.fn()
            global.API = { get: mockApiGet }
            finder.store = { dispatch: () => undefined }
            finder.componentDidMount()
            expect(mockApiGet).toBeCalledWith(0)
        })

        it('it will dispatch items fetched via API', async() => {
            const finder = new Finder()
            global.API = { get: (any) => ([{ id: 1, type: 'DIRECTORY', title: 'monorepo', filepath: null, parent: null }]) }
            const mockDispatch = jest.fn()
            finder.store = { dispatch: mockDispatch }
            await finder.componentDidMount()
            expect(mockDispatch).toHaveBeenCalledWith({
                    "payload": [ { "filepath": null, "id": 1, "parent": null, "title": "monorepo", "type": "DIRECTORY", }, ],
                    "type": "items",
            })
        })
    })
})
