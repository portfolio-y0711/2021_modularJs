const path = require('path')
const fs = require('fs')
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')

describe('HTML', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString()
    })
    it('bread tag exists', () => {
        const tag = document.querySelector('bread')
        expect(tag instanceof HTMLUnknownElement).toBeTruthy()
    })
    it('finder tag exists', () => {
        const tag = document.querySelector('finder')
        expect(tag instanceof HTMLUnknownElement).toBeTruthy()
    })
    it('modal tag exists', () => {
        const tag = document.querySelector('modal')
        expect(tag instanceof HTMLUnknownElement).toBeTruthy()
    })
})
