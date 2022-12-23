import View from './View.js'
import icons from 'url:../../img/icons.svg'
import previewView from './previewView.js' 

class ResultsView extends View {
    //using its child class field called '_parentElement'. You can use fields and methods in the parent class thats from the instances child class
    //sidebar element
    _parentElement = document.querySelector('.results')
    _errorMessage = 'No recipes found for your query! Please try again ;)'
    _message = ''

    _generateMarkup(){ 
        return this._data
        .map(result => previewView.render(result, false))
        .join('')
    }

}

export default new ResultsView()