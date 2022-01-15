class List {
  constructor() {
    this.all = [];
    this.filtered = [];
  }

  add(recipeCard) {
    this.all.push(recipeCard);
  }

  displayRecipes() {
    let html = "";

    this.filtered.forEach((recipeCard) => {
      html += recipeCard.render();
    });

    document.getElementById("recipesContainer").innerHTML = html;
  }
}

export default List;
