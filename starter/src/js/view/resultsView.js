import View from './View.js'
import icons from 'url:../../img/icons.svg'

class ResultsView extends View {
    //using its child class field called '_parentElement'. You can use fields and methods in the parent class thats from the instances child class
    //sidebar element
    _parentElement = document.querySelector('.results')
    _errorMessage = 'No recipes found for your query! Please try again ;)'
    _message = ''

    _generateMarkUp(){ 
        return this._data.map(this._generateMarkUpPreview).join('')
    }

    //controller passes result = (model.state.search.results) from the controlSearchResults() method, which is calling this method
    _generateMarkUpPreview(result){
        return `
            <li class="preview">
                <a class="preview__link preview__link--active" href="#${result.id}">
                <figure class="preview__fig">
                    <img src="${result.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${result.title}</h4>
                    <p class="preview__publisher">${result.publisher}</p>
                    <div class="preview__user-generated">
                    <svg>
                        <use href="${icons}#icon-user"></use>
                    </svg>
                    </div>
                </div>
                </a>
            </li>
        `
    }
}

export default new ResultsView()