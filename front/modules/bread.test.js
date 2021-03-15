import { Bread } from './bread.js'
const path = require('path')
const fs = require('fs')
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
global.LOG = () => undefined

describe('Component: Bread', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString()
    })
    it('bread component has render()', () => {
        const bread = new Bread()
        expect(Object.getPrototypeOf(bread).hasOwnProperty('render')).toBeTruthy()
    })
    it('bread component has props', () => {
        const bread = new Bread()
        expect(bread.hasOwnProperty('props')).toBeTruthy()
    })
    describe('when props are given', () => {
        it('bread component render li element as many as pathQue elems', () => {
            const bread = new Bread()
            bread.props = {
                pathQue: [0],
                pathNameMap: { '0': 'Root' }
            }
            bread.render()
            const lists = document.querySelectorAll('bread li')
            expect([...lists].length).toEqual(1)
        })

        it('bread component render text mapped to pathQue elems', () => {
            const bread = new Bread()
            bread.props = {
                pathQue: [0],
                pathNameMap: { '0': 'Root' }
            }
            bread.render()
            const lists = document.querySelectorAll('bread .arrows li')
            expect([...lists].map(li => li.querySelector('a').textContent)).toContain('Root')
        })
    })
    describe('after bread component rendered', () => {
        it('when li clicked, it invokes global.handler.intoDir()', async() => {
            const bread = new Bread()
            bread.props = {
                pathQue: [0],
                pathNameMap: { '0': 'Root' }
            }
            bread.render()
            const mockGoto = jest.fn()
            global.handler = { goto: mockGoto }
            await bread.render()
            const event = document.createEvent('HTMLEvents')
            event.initEvent('click', false, true)
            bread.wrapper.querySelector('li').dispatchEvent(event)
            expect(mockGoto).toHaveBeenCalledWith(0)
        })
    })
})
