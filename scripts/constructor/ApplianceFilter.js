import Filter from "./Filter.js";
class ApplianceFilter extends Filter {
  constructor(list) {
    super(list, "appliance");
  }

  collect() {
    let list = [];
    this.recipes.filtered.forEach((recipe) => {
      let item = recipe.appliance.toLowerCase();
      if (!list.includes(item)) {
        list.push(item);
      }
    });

    this.filtered = this.displayed = list;
  }

  filterRecipes(recipes) {
    let list = [];
    if (this.selection.length === 0) {
      return recipes;
    }
    list = recipes.filter((recipe) => {
      let existingAppliances = recipe.appliance.toLowerCase();
      let count = 0;

      this.selection.forEach((ingSelect) => {
        if (existingAppliances.includes(ingSelect.toLowerCase())) {
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

export default ApplianceFilter;
