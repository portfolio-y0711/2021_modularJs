class Bread {
    self
    api
    handler
    wrapper
    props = {
        pathQue: [],
        pathNameMap: {}
    }
    moduleName = 'BREAD'
    constructor(handler) {
       this.self = this
       this.handler = handler
       this.wrapper = document.querySelector('bread')
       LOG(`MOD`, `${this.moduleName}`, `Module Created`)
    }
    render() {
        this.wrapper.innerHTML = ''
        const { pathQue, pathNameMap } = this.props
        const renderList = ({id, name}) => `<li id=${id} onclick="window.handler.goto(${id})"><a href="#">${name}</a></li>`
        const lists = pathQue.map(q => 
            ({ id: q, name: pathNameMap[q] })
        )
        const breadView = (`
            <ol class="arrows">
                ${lists.map(renderList).join('')}
            </ol>
        `)
        
        this.wrapper.insertAdjacentHTML('beforeend', breadView)
    }
}

export {
    Bread
}
