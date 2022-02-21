import Filter from "./Filter.js";

/**
 * Ustensil filter constructor
 * @param {Array | Object} data
 * @param {Array | Object} photographer
 * @param {string} src the source of media
 */
class UstensilFilter extends Filter {
  constructor(list) {
    super(list, "ustensil");
  }

  // Collect all ustensils tags in array to lower case

  collect() {
    let list = [];
    this.recipes.filtered.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        let item = ustensil.toLowerCase();
        if (!list.includes(item)) {
          list.push(item);
        }
      });
    });

    this.filtered = this.displayed = list;
  }

  // Filters the recipes according to the selected ustensil tags

  filterRecipes(recipes) {
    let list = [];
    if (this.selection.length === 0) {
      return recipes;
    }
    list = recipes.filter((recipe) => {
      let existingUstensils = recipe.ustensils.map((item) =>
        item.toLowerCase()
      );
      let count = 0;

      this.selection.forEach((ingSelect) => {
        if (existingUstensils.includes(ingSelect.toLowerCase())) {
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

export default UstensilFilter;
