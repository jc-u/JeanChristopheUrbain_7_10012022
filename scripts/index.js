import Recipe from "./constructor/Recipe.js";
import List from "./constructor/List.js";
import IngredientFilter from "./constructor/IngredientFilter.js";

const list = new List();

recipes.forEach((recipe) => {
  const recipeCard = new Recipe(recipe);
  list.add(recipeCard);
});

list.filtered = list.all;

// Scenario
list.displayRecipes();

let filter = new IngredientFilter(list);
filter.collect();
filter.buildDropdown();
filter.listenForDropdownOpening();
filter.listenForDropdownClosing();

//filter.listenForSelection();
//filter.listenForInput();
