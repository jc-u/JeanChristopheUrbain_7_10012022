class IngredientFilter {
  constructor(list) {
    this.recipes = list;
    this.all = [];
    this.filtered = [];
    this.displayed = [];
  }

  collect() {
    let list = [];

    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        list.push(ingredient);
      });
    });

    this.all = list;
  }

  buildDropdown() {
    this.all.forEach((recipe) => {
      document.getElementById(
        "ingredientsFilters"
      ).innerHTML += `<div class="ingredient">${recipe.ingredient}</div>`;
    });
  }

  listenForDropdownOpening() {
    document.querySelector("#ingredient--btn").addEventListener("click", () => {
      document.getElementById("ingredientsFilters").style.display = "none";
      if (
        document.getElementById("ingredientsFilters").style.display === "none"
      ) {
        document.getElementById("ingredientsFilters").style.display = "grid";
        document.getElementById("searchIngredient").style.display = "block";
        document.getElementById("searchIngredient").style.width = "100%";
        document.getElementById("ingredient--btn").style.display = "none";
        document.querySelector(".more").style.display = "none";
        document.querySelector(".less").style.display = "block";
      }
    });
  }

  listenForDropdownClosing() {
    document.querySelector(".less").addEventListener("click", () => {
      document.getElementById("ingredientsFilters").style.display = "none";
      document.querySelector(".more").style.display = "block";
      document.querySelector(".less").style.display = "none";
      document.getElementById("ingredient--btn").style.display = "block";
      document.getElementById("searchIngredient").style.display = "none";
    });
  }

  listenForFilter() {}
}

export default IngredientFilter;
