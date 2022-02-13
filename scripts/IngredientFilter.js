import Filter from "./Filter.js";

/**
 * Ingredient filter constructor
 * @param {Array | Object} data
 * @param {Array | Object} photographer
 * @param {string} src the source of media
 */
class IngredientFilter extends Filter {
  constructor(list) {
    super(list, "ingredient");
  }

  // Collect all ingredients tags in array to lower case

  collect() {
    let list = [];
    this.recipes.filtered.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        let item = ingredient.ingredient.toLowerCase();
        if (!list.includes(item)) {
          list.push(item);
        }
      });
    });

    this.filtered = this.displayed = list;
  }

  // Filters the recipes according to the selected ingredients tags

  filterRecipes(recipes) {
    let list = [];
    if (this.selection.length === 0) {
      return recipes;
    }
    list = recipes.filter((recipe) => {
      let existingIngredients = recipe.ingredients.map((item) =>
        item.ingredient.toLowerCase()
      );

      let count = 0;

      this.selection.forEach((ingSelect) => {
        if (existingIngredients.includes(ingSelect.toLowerCase())) {
          count++;
        }
      });

      if (count == this.selection.length) {
        return true;
      }

      return false;
    });

    return list;
  }
}

export default IngredientFilter;
