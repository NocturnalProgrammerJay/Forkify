import icons from 'url:../../img/icons.svg'

//All files of view have these common functionalities so we place them in a parent(base) class.
export default class View {
    _data
    
    render(data){
        //Array.isArray(data) - checks type and if length is 0 
        if (!data || (Array.isArray(data) && data.length === 0 )) 
            return this.renderError()

        this._data = data
        const markup = this._generateMarkUp() 
        this._clear()
        //places list of elements in the DOM off of API array 
        this._parentElement.insertAdjacentHTML("afterbegin", markup)
    }

    _clear(){
        this._parentElement.innerHTML = ''
    }

    renderSpinner = function(){
        const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }

    renderError(message = this._errorMessage){
      const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
      `
      this._clear()
      this._parentElement.insertAdjacentHTML('afterbegin', markup)
    }
      
      renderMessage(message = this._message){
        const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
        `
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin', markup)
      }

}