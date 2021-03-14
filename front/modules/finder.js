class Finder {
    self
    wrapper
    store
    props = {
        items: undefined,
        parentDir: undefined
    }
    moduleName = 'FINDER'
    constructor() {
        this.self = this
        this.wrapper = document.querySelector('finder')
        LOG(`MOD`, `${this.moduleName}`, `Module Created`)
    }
    render() {
        const { items, parentDir } = this.props
        if (items === undefined) {
            return
        } else {
            const _items = items.map(({ id, type, title, filepath, parent }) => {
                const props = {}
                if (type === 'DIRECTORY') {
                    props['className'] = 'folder'
                    props['icon'] = 'folder'
                    props['method'] = 'intoDir'
                } else if (type === 'FILE') {
                    props['className'] = 'file'
                    props['icon'] = 'file_present'
                    props['method'] = 'open'
                } else {
                    throw Error('ITEM TYPE ERROR')
                }
                return { ...props, id, title, type }
            })

            const itemView = (item => {
                return (`
                <div id="${item.id}" class="${item.className}">
                    <i class="material-icons">${item.icon}
                        <p class="cooltip">0 folders / 0 files</p>
                    </i>
                    <h1>${item.title}</h1>
                </div>`)
            })
            
            const finderView = (
                `<div id="revert">
                    <div class="revert">
                        <i class="material-icons">arrow_left
                            <p class="cooltip">to previous</p>
                        </i>
                    </div>
                </div>
                ${_items.map(itemView).join('')}
            `)

            this.wrapper.insertAdjacentHTML('beforeend', finderView)
            const [folder, file] = [[...this.wrapper.querySelectorAll('div.folder')], [...this.wrapper.querySelectorAll('div.file')]]
        }
    }
    async componentDidMount() {
        const items = await API.get(0)
        this.store.dispatch({ 
            type: 'items',
            payload: items
        })
    }
}

export {
    Finder
}