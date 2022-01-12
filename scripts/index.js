import Recipe from "./constructor/Recipe.js";
import List from "./constructor/List.js";

const list = new List();

/**
 * Update and create photographer section with photographers cards
 */

recipes.forEach((recipe) => {
  const recipeCard = new Recipe(recipe);
  list.add(recipeCard);
});

list.filtered = list.all;

// Scenario
list.displayRecipes();
