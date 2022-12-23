import View from './View.js'
import icons from 'url:../../img/icons.svg'
import previewView from './previewView.js' 

class BookmarksView extends View {
    //using its child class field called '_parentElement'. You can use fields and methods in the parent class thats from the instances child class
    //sidebar element
    _parentElement = document.querySelector('.bookmarks__list')
    _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)'
    _message = ''

    addHandlerRender(handler){
        window.addEventListener('load', handler)
    }

    _generateMarkup(){ 
        return this._data
        .map(bookmark => previewView.render(bookmark, false))
        .join('')
    }
    


}

export default new BookmarksView()