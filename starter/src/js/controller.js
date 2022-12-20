import * as model from './model.js' //   './' = current folder
import recipeView from './view/recipeView.js' 
import searchView from './view/searchView.js' 
import resultsView from './view/resultsView.js' 
import paginationView from './view/paginationView.js' 

import 'core-js/stable' //polyfilling es6/anything else basically
import 'regenerator-runtime/runtime' //polyfilling async/await
// .. = parent folder. 

//parcel
//Hot Module Replacement (HMR) improves the development experience by automatically updating modules in the browser at runtime without needing a whole page refresh.
//This means that application state can be retained as you change small things. Parcel's HMR implementation supports both JavaScript and CSS assets.
// if (module.hot){
//   module.hot.accept()
// }

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
    resultsView.renderSpinner()

    // 1) Get search query
    const query = searchView.getQuery()
    //guard cause
    if (!query) return

    // 2) Load search results
    await model.loadSearchResults(query)

    // 3) render results
    resultsView.render(model.getSearchResultsPage(1))

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search)
  }catch(err) {
    console.log(err)
  }
}

//goToPage - is the data attribute from the frontend on the button ele
//Then page in state = goToPage  and will render new buttons
const controlPagination = function(goToPage){
    // 1) Render NEW results 
    resultsView.render(model.getSearchResultsPage(goToPage))

    // 2) Render NEW pagination
    paginationView.render(model.state.search)
}

//subscriber 
const init = function (){
  recipeView.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
}
init()