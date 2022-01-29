class IngredientFilter {
  constructor(list) {
    this.recipes = list;
    this.all = [];
    this.filtered = [];
    this.displayed = [];
    this.selection = [];
    this.type = "ingredient";
    this.inputSearch = "";
  }

  buildFilters() {
    document.getElementById("filters").innerHTML += ` 
    <div id="${this.type}sContainer" class="tagsListsContainer">
      <button id="${this.type}--btn">
        ${this.type}s
        <div class="${this.type}--btn--more"></div>
      </button>

      <input
        type="text"
        id="search${this.type}"
        class="search__tagsLists__frame__input"
        placeholder="Rechercher"
      />

      <div class="${this.type}--btn--less"></div>
      <div
        id="${this.type}sFilters"
        class="search__tagsLists__filtersLists"
      ></div>
    </div>`;
  }

  buildSelections() {
    document.getElementById(
      "selections"
    ).innerHTML += `<div id="${this.type}__selections"></div>`;
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

  display() {
    return new Promise((resolve, reject) => {
      let html = "";
      this.displayed.forEach((ingredient) => {
        html += `<div class="${this.type}" data-name="${ingredient}">${ingredient}</div>`;
      });

      document.getElementById(`${this.type}sFilters`).innerHTML = html;
      resolve();
    });
  }

  displaySelection() {
    document.getElementById(`${this.type}__selections`).innerHTML = "";
    this.selection.forEach((tag) => {
      document.getElementById(
        `${this.type}__selections`
      ).innerHTML += `<div class="tag-${this.type}" data-id="${tag}" data-type="${this.type}">${tag}</div>`;
    });
  }

  listenForDropdownOpening() {
    document
      .querySelector(`#${this.type}--btn`)
      .addEventListener("click", () => {
        document.getElementById(`${this.type}sFilters`).style.display = "none";
        if (
          document.getElementById(`${this.type}sFilters`).style.display ===
          "none"
        ) {
          document.getElementById(`${this.type}sFilters`).style.display =
            "grid";
          document.getElementById(`search${this.type}`).style.display = "block";
          document.getElementById(`search${this.type}`).style.width = "100%";
          document.getElementById(`${this.type}--btn`).style.display = "none";
          document.querySelector(`.${this.type}--btn--more`).style.display =
            "none";
          document.querySelector(`.${this.type}--btn--less`).style.display =
            "block";
        }
      });
  }

  listenForDropdownClosing() {
    document
      .querySelector(`.${this.type}--btn--less`)
      .addEventListener("click", () => {
        document.getElementById(`${this.type}sFilters`).style.display = "none";
        document.querySelector(`.${this.type}--btn--more`).style.display =
          "block";
        document.querySelector(`.${this.type}--btn--less`).style.display =
          "none";
        document.getElementById(`${this.type}--btn`).style.display = "block";
        document.getElementById(`search${this.type}`).style.display = "none";
        this.inputSearch = "";
      });
  }

  listenForInput() {
    document
      .getElementById(`search${this.type}`)
      .addEventListener("input", (e) => {
        this.inputSearch = e.target.value.toLowerCase();
        this.displayed = this.filtered.filter((item) => {
          return item.search(this.inputSearch) > -1;
        });
        this.display();
        this.listenForSelection();
        this.listenForUnSelect;
      });
  }

  listenForSelection() {
    document.querySelectorAll(`.${this.type}`).forEach((button) => {
      button.addEventListener("click", () => {
        let tag = button.getAttribute("data-name");
        this.selection.push(tag);
        this.update();
      });
    });
  }

  listenForUnSelect() {
    document.querySelectorAll(`.tag-${this.type}`).forEach((button) => {
      button.addEventListener("click", () => {
        let tag = button.getAttribute("data-id");
        let index = this.selection.findIndex((item) => item === tag);
        this.selection.splice(index, 1);
        this.update();
      });
    });
  }

  update() {
    this.filterRecipes();
    this.recipes.display();
    this.displaySelection();
    this.collect();
    this.display().then(() => {
      this.listenForSelection();
      this.listenForUnSelect();
    });
  }

  filterRecipes() {
    if (this.selection.length === 0) {
      this.recipes.filtered = this.recipes.all;
      return;
    }
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
