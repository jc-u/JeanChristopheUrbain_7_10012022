import Recipe from "./Recipe.js";
import List from "./List.js";
import IngredientFilter from "./IngredientFilter.js";
import ApplianceFilter from "./ApplianceFilter.js";
import UstensilFilter from "./UstensilFilter.js";

const list = new List();
const ingredient = new IngredientFilter(list);
const appliance = new ApplianceFilter(list);
const ustensil = new UstensilFilter(list);

/**
 * Update and create recipe section with recipes cards
 */

recipes.forEach((recipe) => {
  const recipeCard = new Recipe(recipe);
  list.add(recipeCard);
});

// Scenario
list.filtered = list.all;
list.addFilter(ingredient);
list.addFilter(appliance);
list.addFilter(ustensil);
list.display();
list.listenForSearch();
