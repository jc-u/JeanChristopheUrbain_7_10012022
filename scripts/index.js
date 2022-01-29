import Recipe from "./constructor/Recipe.js";
import List from "./constructor/List.js";
import IngredientFilter from "./constructor/IngredientFilter.js";
import ApplianceFilter from "./constructor/ApplianceFilter.js";

const list = new List();

recipes.forEach((recipe) => {
  const recipeCard = new Recipe(recipe);
  list.add(recipeCard);
});

list.filtered = list.all;

// Scenario
list.display();

let filter = new IngredientFilter(list);
filter.buildFilters();
filter.buildSelections();
filter.listenForInput();
filter.collect();
filter.display().then(() => {
  filter.listenForDropdownOpening();
  filter.listenForDropdownClosing();
  filter.listenForSelection();
});

let appliance = new ApplianceFilter(list);
appliance.buildFilters();
appliance.buildSelections();
appliance.listenForInput();
appliance.collect();
appliance.display().then(() => {
  appliance.listenForDropdownOpening();
  appliance.listenForDropdownClosing();
  appliance.listenForSelection();
});
