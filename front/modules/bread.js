class Bread {
    self
    wrapper
    props
    moduleName = 'BREAD'
    constructor() {
       this.self = this
       this.wrapper = document.querySelector('bread')
       LOG(`MOD`, `${this.moduleName}`, `Module Created`)
    }
    render() {
        const { pathQue, pathNameMap } = this.props

        const renderList = ({id, name}) => `<li id=${id}><a href="#">${name}</a></li>`
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
