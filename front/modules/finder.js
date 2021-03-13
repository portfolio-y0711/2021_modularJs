class Finder {
    self
    wrapper
    moduleName = 'FINDER'
    constructor() {
        this.self = this
        this.wrapper = document.querySelector('finder')
        LOG(`MOD`, `${this.moduleName}`, `Module Created`)
    }
}

export {
    Finder
}