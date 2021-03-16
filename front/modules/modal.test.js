import { Modal } from './modal.js'
const path = require('path')
const fs = require('fs')
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
global.LOG = () => undefined

describe('Component: Modal', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString()
    })
})