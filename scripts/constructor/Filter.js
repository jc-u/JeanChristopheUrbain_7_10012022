class Filter {
  constructor(list, type) {
    this.recipes = list;
    this.all = [];
    this.filtered = [];
    this.displayed = [];
    this.selection = [];
    this.type = type;
    this.inputSearch = "";
  }

  async createHTML() {
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

    document.getElementById(
      "selections"
    ).innerHTML += `<div id="${this.type}__selections"></div>`;
  }

  display() {
    return new Promise((resolve, reject) => {
      let html = "";
      this.displayed.forEach((appliance) => {
        html += `<div class="${this.type}" data-name="${appliance}">${appliance}</div>`;
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
        this.resetInput();
        this.reset();
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

  resetInput() {
    this.inputSearch = "";
    document.getElementById(`search${this.type}`).value = "";
    this.displayed = this.filtered;
  }

  listenForSelection() {
    document.querySelectorAll(`.${this.type}`).forEach((button) => {
      button.addEventListener("click", () => {
        let tag = button.getAttribute("data-name");
        this.selection.push(tag);
        this.recipes.filter();
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
        this.recipes.filter();
        this.update();
      });
    });
  }

  reset() {
    this.display().then(() => {
      this.listenForDropdownOpening();
      this.listenForDropdownClosing();
      this.listenForSelection();
    });
  }

  update() {
    this.displaySelection();
    this.collect();
    this.display().then(() => {
      this.listenForSelection();
      this.listenForUnSelect();
    });
    this.resetInput();
  }
}

export default Filter;
