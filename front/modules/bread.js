class Bread {
    self
    wrapper
    moduleName = 'BREAD'
    constructor() {
       this.self = this
       this.wrapper = document.querySelector('bread')
       LOG(`MOD`, `${this.moduleName}`, `Module Created`)
    }
}

export {
    Bread
}
