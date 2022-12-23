import { async } from 'regenerator-runtime'
import  {API_URL, RES_PER_PAGE}  from './config.js'
import {getJSON} from './helpers.js'

export const state = {
    recipe: {},
    search: {
      query: '',
      results: [], //contains all the search results
      resultsPerPage: RES_PER_PAGE,
      page: 1,
    },
    bookmarks: []
}

//loadRecipe function only changes our state object above
export const loadRecipe = async function(id){
    try{
      
      const data = await getJSON(`${API_URL}${id}`)

      console.log(data);
  
      const {recipe} = data.data
      //formatting recipe to get rid of underscores.

      state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url, //Basically a url which points to the location of the image on the Forkify API server
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients
      }

      //some() == any. This will return true if any of the iterables meets the condition
      if (state.bookmarks.some(bookmark => bookmark.id === id))
        state.recipe.bookmarked = true
      else
        state.recipe.bookmarked = false


    }catch(err){
        console.error(`${err}💥💥💥`)
        throw err
    }
}

export const loadSearchResults = async function(query){
  try{
    state.search.query = query

    //user searches query word, searches (?search=) for query in the object title
    const data = await getJSON(`${API_URL}?search=${query}`)

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url
      }
    })

    state.search.page = 1


  }catch(err){
    console.error(`${err}`)
    throw err
  }
}

//Pagination 
export const getSearchResultsPage = function(page = state.search.page ){
  //state changes when a number is passed in as an argument
  state.search.page = page 

  const start = (page - 1) * state.search.resultsPerPage // if page is 1 then start = 0, if page = 2 then start = 10
  const end = page * state.search.resultsPerPage // ends at 10 then next page ends at 20

  return state.search.results.slice(start, end)
}

//Not working, reading NAN on state.recipe.ingredients
export const updateServings = function (newServings){
  state.recipe.ingredients.forEach(ing => {
    // newQt = oldQt * mewServings / oldServings // (2 * 8)/4 = 4
      ing.quantity = (ing.quantity * newServings) / state.recipe.servings
  })

  //update to new servings size of current recipe
  state.recipe.servings = newServings
}

const persistBookmarks = function(){
  //Add bookmark
  //state.bookmarks.push(recipe)

  //Mark current recipe as bookmarked
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

export const addBookMark = function(recipe){
  //Add bookmark
  state.bookmarks.push(recipe)

  //Mark current recipe as bookmark - add new property
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true

  persistBookmarks()

}

export const deleteBookMark = function(id){
  //Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id)
  state.bookmarks.splice(index, 1)

  //Mark current recipe as NOT bookmarked 
  if (id === state.recipe.id) state.recipe.bookmarked = false

  persistBookmarks()
}

const init = function(){
  const storage = localStorage.getItem('bookmarks')
  if (storage) state.bookmarks = JSON.parse(storage)
}

init()

const clearBookmarks = function(){
  localStorage.clear('bookmarks')
}
//clearBookmarks()



// API -  https://forkify-api.herokuapp.com/v2
//bash terminal - npm i core-js regenerator-runtime        

//NOTES:
//https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
//route = forkify-api.herokuapp.com/api/v2/recipes
// \? query search
//query string = search. This the variable and pizza is the value
// sub out 'search=pizza' and insert a id and it will give us the data of that id pizza ingredients. In the background ?search= id