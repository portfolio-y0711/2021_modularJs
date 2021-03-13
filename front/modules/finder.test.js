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
                    {
                        id: 1,
                        type: 'DIRECTORY',
                        title: 'monorepo',
                        filepath: null,
                        parent: 0
                    }, 
                    {
                        id: 3,
                        type: 'DIRECTORY',
                        title: 'assets',
                        filepath: null,
                        parent: 0
                    },
                    {
                        id: 4,
                        type: 'FILE',
                        title: 'mono.png',
                        filepath: './assets/mono.png',
                        parent: 1
                    },
                ],
                parentDir: 0
            }
            finder.render()
            const folderlists = document.querySelectorAll('finder .folder')
            const filelists = document.querySelectorAll('finder .file')
            expect([...folderlists].length).toEqual(2)
            expect([...filelists].length).toEqual(1)
        })

        it('finder component render elem with #revert', () => {
            const finder = new Finder()
            finder.props = {
                items: [
                    {
                        id: 1,
                        type: 'DIRECTORY',
                        title: 'monorepo',
                        filepath: null,
                        parent: 0
                    }
                ],
                parentDir: 0
            }
            finder.render()
            const revert = document.querySelector('finder #revert')
            expect(revert.id).toEqual('revert')
        })
    })
})
