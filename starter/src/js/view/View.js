import icons from 'url:../../img/icons.svg'

//All files of view have these common functionalities so we place them in a parent(base) class.
export default class View {
    _data
    
    render(data, render = true){
        //Array.isArray(data) - checks type and if length is 0 
        if (!data || (Array.isArray(data) && data.length === 0 )) 
            return this.renderError()

        this._data = data
        const markup = this._generateMarkup() 

        if(!render) return markup

        this._clear()
        //places list of elements in the DOM off of API array 
        this._parentElement.insertAdjacentHTML("afterbegin", markup)
    }

    //Create new markup instead of rendering the browser 
    update(data){
        this._data = data
        const newMarkup = this._generateMarkup() 

        //create a dom object and place in memory to use. 
        //createRange - 
        //createContextualFragment - take a string and converts it into real DOM node objects aka virtual DOM
        const newDOM = document.createRange().createContextualFragment(newMarkup)

        //after
        const newElements = Array.from(newDOM.querySelectorAll('*'))
        //before
        const curElements = Array.from(this._parentElement.querySelectorAll('*'))

        //if there is a change then replace old text with the new text from the virtual DOM
        newElements.forEach((newEl,i)=> {
          const curEl = curElements[i]
          //console.log(curEl , newEl.isEqualNode(curEl));//isEqualNode compares content

          //Update change Text
          if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){ //nodeValue - does context contain text?

            curEl.textContent = newEl.textContent
          }

          //Update changed attributes
          if (!newEl.isEqualNode(curEl)){
            //console.log(newEl.attributes); //this will show as NamedNodeMap in the console.
            Array.from(newEl.attributes).forEach(attr =>
              //replacing the curEl attributes to the new attributes
               curEl.setAttribute(attr.name, attr.value))
          }
        })
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