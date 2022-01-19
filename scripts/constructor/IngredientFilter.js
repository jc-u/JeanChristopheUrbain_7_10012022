class IngredientFilter {
  constructor(list) {
    this.recipes = list;
    this.all = [];
    this.filtered = [];
    this.displayed = [];
    this.selection = [];
  }

  build() {
    document.getElementById("filters").innerHTML = ` 
    <div id="ingredientsContainer" class="tagsListsContainer">
      <button id="ingredient--btn">
        Ingredients
        <div class="more"></div>
      </button>

      <input
        type="text"
        id="searchIngredient"
        class="search__tagsLists__frame__input"
        placeholder="Recherche un ingrédient"
      />

      <div class="less"></div>
      <div
        id="ingredientsFilters"
        class="search__tagsLists__filtersLists"
      ></div>
    </div>`;
  }

  collect() {
    let list = [];

    this.recipes.filtered.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        list.push(ingredient);
      });
    });

    this.filtered = list;
  }

  display() {
    return new Promise((resolve, reject) => {
      this.filtered.forEach((recipe) => {
        document.getElementById(
          "ingredientsFilters"
        ).innerHTML += `<div class="ingredient" data-name="${recipe.ingredient}">${recipe.ingredient}</div>`;
      });
      resolve();
    });
  }

  displaySelection() {
    document.getElementById("selections").innerHTML = "";
    this.selection.forEach((tag) => {
      document.getElementById("selections").innerHTML += tag;
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

  listenForSelection() {
    document.querySelectorAll(".ingredient").forEach((button) => {
      button.addEventListener("click", () => {
        let tag = button.getAttribute("data-name");
        this.selection.push(tag);
        this.filterRecipes();
        this.recipes.display();
        this.displaySelection();
        this.collect();
      });
    });
  }

  filterRecipes() {
    this.recipes.filtered = this.recipes.all.filter((recipe) => {
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
  }
}

export default IngredientFilter;
