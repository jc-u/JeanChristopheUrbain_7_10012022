/**
 * Represent a list of recipes
 * @constructor
 * @param {array} all - list all recipes
 * @param {array} filtered - list filtered recipes
 * @param {array} filters - list filters tags
 * @param {string} searchTerm - value of the input searchBar
 */

class List {
  constructor() {
    this.all = [];
    this.filtered = [];
    this.filters = [];
    this.searchTerm = "";
  }

  // Adds all the recipes in array

  add(recipeCard) {
    this.all.push(recipeCard);
  }

  // Adds filters tags in array

  async addFilter(filter) {
    this.filters.push(filter);
    await filter.createHTML();
    filter.collect();
    filter.listenForInput();
    filter.reset();
  }

  // Display of recipes cards

  display() {
    let html = "";

    this.filtered.forEach((recipeCard) => {
      html += recipeCard.render();
    });

    document.getElementById("recipesContainer").innerHTML = html;
  }

  // Filters the recipes according to the selected tags

  filter(newSelection) {
    let list = this.all;

    if (newSelection) {
      list = this.filtered;
    }

    this.filters.forEach((filter) => {
      list = filter.filterRecipes(list);
    });
    this.filtered = list;
    this.display();

    this.filters.forEach((filter) => {
      filter.update();
    });
  }

  // Listen to the input value in the searchBar

  listenForSearch() {
    document.getElementById("searchBar").addEventListener("input", (e) => {
      let hasNewCharacter = !!(e.target.value.length > this.searchTerm.length);
      this.searchTerm = e.target.value.toLowerCase();
      this.search(hasNewCharacter);
      this.display();
    });
  }

  // search algorithm

  search(hasNewCharacter) {
    let list = this.all;

    if (this.searchTerm.length === 0) {
      this.filtered = this.all;
    }

    if (hasNewCharacter) {
      list = this.filtered;
    }

    this.filtered = list.filter((recipe) => {
      let toKeep = false;

      if (
        recipe.name.toLowerCase().includes(this.searchTerm) ||
        recipe.description.includes(this.searchTerm) ||
        recipe.appliance.toLowerCase().includes(this.searchTerm)
      ) {
        toKeep = true;
      }

      recipe.ustensils.forEach((ustensil) => {
        if (ustensil.toLowerCase().includes(this.searchTerm)) {
          toKeep = true;
        }

        recipe.ingredients.forEach((ingredient) => {
          if (ingredient.ingredient.toLowerCase().includes(this.searchTerm)) {
            toKeep = true;
          }
        });
      });

      return toKeep;
    });
  }

  /* searchAlt(hasNewCharacter) {
    let list = this.all;

    if (this.searchTerm.length === 0) {
      this.filtered = this.all;
    }

    if (hasNewCharacter) {
      list = this.filtered;
    }

    this.filtered = list.filter((recipe) => {
      let toKeep = false;
      if (
        recipe.name.toLowerCase().includes(this.searchTerm) ||
        recipe.description.includes(this.searchTerm) ||
        recipe.appliance.toLowerCase().includes(this.searchTerm)
      ) {
        return true;
      }

      for (let i = 0; i < recipe.ustensils.length; i++) {
        let ustensil = recipe.ustensils[i];
        if (ustensil.toLowerCase().includes(this.searchTerm)) {
          return true;
        }
      }
      return toKeep;

      for (let j = 0; j < recipe.ingredients.length; j++) {
        let ingredient = recipe.ingredient.ingredient[j];
        if (ingredient.toLowerCase().includes(this.searchTerm)) {
          return true;
        }
      }
      return toKeep;
    });
  } */
}

export default List;
