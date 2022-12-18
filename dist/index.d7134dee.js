const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const showRecipe = async function() {
    //https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
    //route = forkify-api.herokuapp.com/api/v2/recipes
    // \? query search
    //query string = search. This the variable and pizza is the value
    // sub out 'search=pizza' and insert a id and it will give us the data of that id pizza ingredients. In the background ?search= id
    try {
        const res = await fetch(// 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
        "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcd09");
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        //console.log(res, data);
        let { recipe  } = data.data;
        //formatting recipe to get rid of underscores.
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            serving: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };
        console.log(recipe);
    } catch (err) {
        alert(err);
    }
};
showRecipe();

//# sourceMappingURL=index.d7134dee.js.map
