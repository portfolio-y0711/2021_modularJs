class Modal {
    self
    wrapper
    handler
    store
    moduleName = 'MODAL'
    constructor(handler) {
        this.self = this
        this.handler = handler
        this.wrapper = document.querySelector('modal')
        window.modal = this
        LOG(`MOD`, `${this.moduleName}`, `Module Created`)
    }
    render() {
        this.wrapper.innerHTML = ''

        const modalView = (`
            <div id="myModal" data-itemtype="modal" class="modal" onclick="document.getElementById('myModal').style.display='none'">
                <img class="modal-content" height="400" width="600">
                <div id="caption"></div>
            </div>
        `)
        
        this.wrapper.insertAdjacentHTML('beforeend', modalView)
    }
    async openFile(id) {
        const blob = await this.handler.openFile(id)
        const modal = this.wrapper.querySelector('[data-itemtype="modal"')
        const modalImg = this.wrapper.querySelector('img')
        modal.style.display = "block"
        modalImg.src = URL.createObjectURL(blob) 
        modalImg.style.border = 0
    }
}

export {
    Modal
}