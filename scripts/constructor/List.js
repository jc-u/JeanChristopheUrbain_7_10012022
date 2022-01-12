/**
 * Represent a list of photographers and a list of tags.
 * @constructor
 * @param {array} all - list all photographers
 * @param {array} filtered - list filtered tags
 * @param {string} tags - list tags
 * @param {string} selection - list of selected tags
 */

class List {
  constructor() {
    this.all = [];
    this.filtered = [];
  }

  // Adds all the photographers in array
  add(recipeCard) {
    this.all.push(recipeCard);
  }

  // Display of photographers cards
  displayRecipes() {
    let html = "";

    this.filtered.forEach((recipeCard) => {
      html += recipeCard.render();
    });

    document.getElementById("recipesContainer").innerHTML = html;
  }
}

export default List;
