document.addEventListener('DOMContentLoaded', () => {
  const ingredients = {
    egg: false,
    tomato: false,
    cheese: false,
    bread: false,
    onion: false,
    potato: false,
    pepper: false,
    milk: false,
    flour: false,
    butter: false,
    pasta: false,
    yogurt: false,
    rice: false,
    groundMeat: false
  };

  const recipeList = document.getElementById('recipeList');
  const suggestionsSection = document.getElementById('suggestionsSection');
  const suggestButton = document.getElementById('suggestButton');
  const clearButton = document.getElementById('clearButton');

  function updateIngredients() {
    for (const key in ingredients) {
      const checkbox = document.getElementById(key);
      ingredients[key] = checkbox.checked;
    }
  }

  function suggestRecipes() {
    updateIngredients();
    const suggestions = [];

    if (ingredients.egg && ingredients.tomato && ingredients.pepper && ingredients.onion) {
      suggestions.push("Menemen (Turkish scrambled eggs with vegetables)");
    }

    if (ingredients.egg && ingredients.bread && ingredients.cheese) {
      suggestions.push("Breakfast Toast with Egg and Cheese");
    }

    if (ingredients.potato && ingredients.onion && ingredients.butter) {
      suggestions.push("Fried Potatoes with Onion and Butter");
    }

    if (ingredients.pasta && ingredients.cheese && ingredients.milk) {
      suggestions.push("Creamy Cheese Pasta");
    }

    if (ingredients.rice && ingredients.yogurt && ingredients.butter) {
      suggestions.push("Buttered Rice with Yogurt");
    }

    if (ingredients.pasta && ingredients.groundMeat && ingredients.tomato) {
      suggestions.push("Pasta with Ground Meat and Tomato Sauce");
    }

    if (ingredients.flour && ingredients.butter && ingredients.sugar) {
      suggestions.push("Flour Halva (Sweet Dessert)");
    }

    if (ingredients.flour && ingredients.egg && ingredients.milk && ingredients.butter) {
      suggestions.push("Simple Homemade Crepes");
    }

    recipeList.innerHTML = '';

    if (suggestions.length > 0) {
      suggestionsSection.classList.remove('hidden');
      suggestions.forEach(recipe => {
        const item = document.createElement('li');
        item.className = 'bg-green-100 text-green-800 px-4 py-3 rounded-lg border border-green-300 shadow-sm text-lg font-medium';
        item.textContent = recipe;
        recipeList.appendChild(item);
      });
    } else {
      suggestionsSection.classList.remove('hidden');
      const noMatch = document.createElement('li');
      noMatch.className = 'text-center text-gray-600 italic';
      noMatch.textContent = 'Sorry, no recipe found with selected ingredients.';
      recipeList.appendChild(noMatch);
    }
  }

  function clearSelections() {
    for (const key in ingredients) {
      const checkbox = document.getElementById(key);
      checkbox.checked = false;
    }
    suggestionsSection.classList.add('hidden');
    recipeList.innerHTML = '';
  }

  suggestButton.addEventListener('click', suggestRecipes);
  clearButton.addEventListener('click', clearSelections);
});
