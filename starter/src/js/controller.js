import * as model from './model.js' //   './' = current folder
import recipeView from './view/recipeView.js' 
import searchView from './view/recipeView.js' 

import 'core-js/stable' //polyfilling es6/anything else basically
import 'regenerator-runtime/runtime' //polyfilling async/await
// .. = parent folder. 


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

const controlSearchResults = async function(){
  try{
    const query = searchView.getQuery()
    //guard cause
    if (!query) return

    model.loadSearchResults('pizza')
    console.log(model.state.search.results);
  }catch(err) {
    console.log(err)
  }
}

//subscriber 
const init = function (){
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerRender(controlSearchResults)
}
init()