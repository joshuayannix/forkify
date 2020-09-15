import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      alert('Something went wrong')
    }
  }

  calcTime() {
    // assuming we need 15 min for every 3 ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng /3);
    this.time = periods * 15;
  };

  calcServings() {
    this.servings = 4;
  };

  parseIngredients() {
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

    const newIngredients = this.ingredients.map(el => {
      // 1. Convert the units to be uniform
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // 2. Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // 3. Parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(' ');

      // Within this array, find if there is a match for a value in unitsShort
      // If so, then return the index. 
      // For example if you find tsp, then give the index of tsp within the array

      const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

      let objIng;
      if (unitIndex > -1) {
        // There is a unit
        const arrCount = arrIng.slice(0, unitIndex);
        // If 4 1/2 cups, then arrCount is [4, 1/2]
        // If 4 cups, then arrCount is [4]
        // Start from the beginning and go up to (not including) the unit. Get numbers only

        let count;
        if (arrCount.length === 1) {
          // just in case there's a - sign, replace with +
          count = parseInt(arrIng[0].replace('-', '+'));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
          // ex. converts eval("4+1/2") --> 4.5
        }        

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        }

      } else if (parseInt(arrIng[0], 10)){
        // If there is no unit but the 1st element is a number
        // parseInt would only return true if the arg was a number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        }
      } else if (unitIndex === -1) {
        // There is NO unit and NO number in 1st position
        objIng = {
          count: 1,
          unit: '',
          ingredient
        }
      }

      return objIng;
    });
    this.ingredients = newIngredients;
  }
}