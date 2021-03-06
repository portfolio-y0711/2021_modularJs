class Finder {
    self
    api
    wrapper
    handler
    store
    props = {
        currentDir: 0,
        items: undefined,
        parentDir: undefined
    }
    moduleName = 'FINDER'
    constructor(handler) {
        this.self = this
        this.handler = handler
        this.wrapper = document.querySelector('finder')
        LOG(`MOD`, `${this.moduleName}`, `Module Created`)
    }
    render() {
        const { items, parentDir } = this.props
        if (items === undefined) {
            return
        } else {
            this.wrapper.innerHTML = ''
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
                <div id="${item.id}" class="${item.className}" onclick="('${item.type}' === 'FILE') ? window.modal.openFile(${item.id}) : window.handler.intoDir({ id: ${item.id}, pathName: '${item.title}' })">
                    <i class="material-icons">${item.icon}
                        <p class="cooltip">0 folders / 0 files</p>
                    </i>
                    <h1>${item.title}</h1>
                </div>`)
            })
            
            const finderView = (items) => (
                `<div id="revert" onclick="window.handler.outOfDir()">
                    <div class="revert">
                        <i class="material-icons">arrow_left
                            <p class="cooltip">to previous</p>
                        </i>
                    </div>
                </div>
                ${items.map(itemView).join('')}
            `)
            this.wrapper.insertAdjacentHTML('beforeend', finderView(_items))
            const [folder, file] = [[...this.wrapper.querySelectorAll('div.folder')], [...this.wrapper.querySelectorAll('div.file')]]
        }
    }

    componentDidMount() {
        this.handler.intoDir({ id: 0, pathName: 'Root' })
    }
}

export {
    Finder
}