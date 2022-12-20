class SearchView {
    #parentEl = document.querySelector('.search')
    getQuery(){
        return this.#parentEl.querySelector('.search_field').value
    }

    //publisher
    addHandlerSearch(handler){
        this.#parentEl.addHandlerSearch('submit', function(e){
            e.preventDefault()
            handler()
        })
    }
}

export default new SearchView()