class List {
  constructor() {
    this.all = [];
    this.filtered = [];
    this.filters = [];
  }

  add(recipeCard) {
    this.all.push(recipeCard);
  }

  async addFilter(filter) {
    this.filters.push(filter);
    await filter.createHTML();
    filter.collect();
    filter.listenForInput();
    filter.reset();
  }

  display() {
    let html = "";

    this.filtered.forEach((recipeCard) => {
      html += recipeCard.render();
    });

    document.getElementById("recipesContainer").innerHTML = html;
  }

  filter() {
    let list = this.all;

    this.filters.forEach((filter) => {
      list = filter.filterRecipes(list);
    });
    this.filtered = this.displayed = list;
    this.display();
  }
}

export default List;
