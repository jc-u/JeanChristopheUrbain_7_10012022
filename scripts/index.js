import Recipe from "./constructor/Recipe.js";
import List from "./constructor/List.js";
import IngredientFilter from "./constructor/IngredientFilter.js";
import ApplianceFilter from "./constructor/ApplianceFilter.js";

const list = new List();
const ingredient = new IngredientFilter(list);
const appliance = new ApplianceFilter(list);

recipes.forEach((recipe) => {
  const recipeCard = new Recipe(recipe);
  list.add(recipeCard);
});

list.filtered = list.all;
list.addFilter(ingredient);
list.addFilter(appliance);

// Scenario
list.display();
