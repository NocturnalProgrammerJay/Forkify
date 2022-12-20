import { async } from 'regenerator-runtime'
import  {API_URL}  from './config.js'
import {getJSON} from './helpers.js'

export const state = {
    recipe: {}
}

//loadRecipe function only changes our state object above
export const loadRecipe = async function(id){
    try{
      
      const data = await getJSON(`${API_URL}/${id}`)
  
      const {recipe} = data.data
      //formatting recipe to get rid of underscores.
      state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url, //Basically a url which points to the location of the image on the Forkify API server
        serving: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients
      }
      console.log(state.recipe);
    }catch(err){
        console.error(`${err}💥💥💥`)
        throw err
    }
}




// API -  https://forkify-api.herokuapp.com/v2
//bash terminal - npm i core-js regenerator-runtime        

//NOTES:
//https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
//route = forkify-api.herokuapp.com/api/v2/recipes
// \? query search
//query string = search. This the variable and pizza is the value
// sub out 'search=pizza' and insert a id and it will give us the data of that id pizza ingredients. In the background ?search= id