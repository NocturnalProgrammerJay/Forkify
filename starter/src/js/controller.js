import * as model from './model.js' //   './' = current folder
import recipeView from './view/recipeView.js' 
import searchView from './view/searchView.js' 
import resultsView from './view/resultsView.js' 
import paginationView from './view/paginationView.js' 
import bookmarksView from './view/bookmarksView.js' 

import 'core-js/stable' //polyfilling es6/anything else basically
import 'regenerator-runtime/runtime' //polyfilling async/await
// .. = parent folder. 

//parcel
//Hot Module Replacement (HMR) improves the development experience by automatically updating modules in the browser at runtime without needing a whole page refresh.
//This means that application state can be retained as you change small things. Parcel's HMR implementation supports both JavaScript and CSS assets.
// if (module.hot){
//   module.hot.accept()
// }

// const renderSpinner = function(parentEl){
//   const markup = `
//     <div class="spinner">
//       <svg>
//         <use href="${icons}#icon-loader"></use>
//       </svg>
//     </div>
//   `
//   parentEl.innerHTML = ''
//   parentEl.insertAdjacentHTML('afterbegin', markup)
// }

const controlRecipes = async function(){
  try {
    const id = window.location.hash.slice(1)
    if (!id) return 

    recipeView.renderSpinner()

    //  0) Update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage())
    
    //  1) updating bookmarks view
    bookmarksView.update(model.state.bookmarks)

    //  2) Loading recipe
    await model.loadRecipe(id)
    
    //  3) Rendering recipe
    recipeView.render(model.state.recipe)
    
    
  }catch (err){
    recipeView.renderError()
    console.error(err)
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

const controlServings = function(newServings){
  //Update the recipe servings (in state)
  model.updateServings(newServings)

  //update the recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookmark = function(){
  //  1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe)
  else model.deleteBookMark(model.state.recipe.id)

  //  2) Update recipe view
  recipeView.update(model.state.recipe)

  //  3) Render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks)
}

//subscriber 
const init = function (){
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  
}
init()