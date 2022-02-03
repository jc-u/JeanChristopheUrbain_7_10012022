import Filter from "./Filter.js";
class IngredientFilter extends Filter {
  constructor(list) {
    super(list, "ingredient");
  }

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
