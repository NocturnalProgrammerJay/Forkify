import * as model from './model.js' //   './' = current folder
import recipeView from './view/recipeView.js' 

import 'core-js/stable' //polyfilling es6/anything else basically
import 'regenerator-runtime/runtime' //polyfilling async/await



// .. = parent folder. 
const recipeContainer = document.querySelector('.recipe')


const renderSpinner = function(parentEl){
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `
  parentEl.innerHTML = ''
  parentEl.insertAdjacentHTML('afterbegin', markup)
}

const controlRecipes = async function(){
  try {
    const id = window.location.hash.slice(1)
    if (!id) return 

    recipeView.renderSpinner()

    //  1) Loading recipe
    await model.loadRecipe(id)

    // 2) Rendering recipe
    recipeView.render(model.state.recipe)
    
      
  }catch (err){
    recipeView.renderError()
  }
}
const init = function (){
  recipeView.addHandlerRender(controlRecipes)
}
init()