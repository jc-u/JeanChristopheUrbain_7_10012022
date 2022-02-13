import Tools from "./Tools.js";
/**
 * Represents a recipe.
 * @constructor
 * @param {number} id - the id of a recipe
 * @param {string} name - the name of a recipe
 * @param {string} servings - the servings of a recipe
 * @param {Array} ingredients - the ingredients of a recipe
 * @param {number} time - the time of a recipe
 * @param {string} description - the description of a recipe
 * @param {string} appliance - the appliance of a recipe
 * @param {string} ustensils - the ustencils of a recipe
 */
class Recipe {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.servings = data.servings;
    this.ingredients = data.ingredients;
    this.time = data.time;
    this.description = data.description;
    this.appliance = data.appliance;
    this.ustensils = data.ustensils;
  }

  /**
   * Create recipe card
   * @returns {string} - Return recipe card
   */

  render() {
    return `
    <div class="recipesList__card">
      <div class="recipesList__card__image"></div>
      <div class="recipesList__card__title">
        <div class="recipesList__card__title__name">${this.name}</div>
        <div class="recipesList__card__title__time">${this.time} min</div>
      </div>
      <div class="recipesList__card__description">
         <div class="recipesList__card__description__ingredients">
            ${this.ingredientsList()}
          </div>
          <div class="recipesList__card__description__process" >
            ${this.description}
          </div>
      </div>
    </div>
  </div>`;
  }

  /**
   * Create ingredient list of a recipe
   * @returns {string} - Return ingredient list
   */

  ingredientsList() {
    const ingredientsList = [];
    this.ingredients.forEach((ingredient) => {
      ingredientsList.push(
        `<p class="ingredient"><b>${Tools.emptyIfUndefined(
          ingredient.ingredient
        )}:</b> ${Tools.emptyIfUndefined(
          ingredient.quantity
        )} ${Tools.emptyIfUndefined(ingredient.unit)}</p>`
      );
    });
    return ingredientsList.join("");
  }
}

export default Recipe;
