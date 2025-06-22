// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const ingredientCheckboxes = document.querySelectorAll('input[name="ingredient"]');
    const suggestRecipesBtn = document.getElementById('suggestRecipesBtn');
    const clearBtn = document.getElementById('clearBtn');
    const recipeResultsDiv = document.getElementById('recipeResults');
    const recipeListUl = document.getElementById('recipeList');
    const noRecipeMessageP = document.getElementById('noRecipeMessage');

    // Define the recipes with their required ingredients
    // This structure allows for easy lookup based on selected ingredients
    const recipes = [
        {
            name: "Menemen",
            ingredients: ["egg", "tomato", "onion", "pepper"]
        },
        {
            name: "Pasta with Ground Meat",
            ingredients: ["pasta", "groundMeat", "tomato"]
        },
        {
            name: "Flour Halva",
            ingredients: ["flour", "butter", "sugar"]
        },
        {
            name: "Simple Homemade Crepes",
            ingredients: ["egg", "milk", "flour", "butter"]
        },
        // New recipes with added ingredients
        {
            name: "Grilled Cheese Sandwich",
            ingredients: ["bread", "cheese", "butter"]
        },
        {
            name: "Tomato & Cheese Omelette",
            ingredients: ["egg", "tomato", "cheese"]
        },
        {
            name: "Potato Salad",
            ingredients: ["potato", "egg", "onion"]
        },
        {
            name: "Yogurt Soup", // Changed from "Yogurt Soup (Yaylada Çorbası)"
            ingredients: ["yogurt", "flour", "egg"]
        },
        {
            name: "Simple Rice Pilaf",
            ingredients: ["rice", "butter"]
        },
        {
            name: "Cheesy Pasta Bake",
            ingredients: ["pasta", "cheese", "milk"]
        }
        // Add more recipes here as needed following the same structure
    ];

    /**
     * Updates the visual state of an ingredient label based on its checkbox.
     * When checked, it adds a highlight class; when unchecked, it removes it.
     * @param {HTMLInputElement} checkbox - The checkbox element.
     */
    const updateIngredientLabelVisual = (checkbox) => {
        const label = checkbox.closest('label'); // Get the parent label element
        if (checkbox.checked) {
            label.classList.add('bg-blue-100', 'border-blue-500', 'shadow-md', 'checked-highlight');
        } else {
            label.classList.remove('bg-blue-100', 'border-blue-500', 'shadow-md', 'checked-highlight');
        }
    };

    /**
     * Initializes the visual state for all ingredient labels based on their initial checkbox state.
     */
    const initializeIngredientLabelVisuals = () => {
        ingredientCheckboxes.forEach(checkbox => {
            updateIngredientLabelVisual(checkbox);
        });
    };

    // Attach event listeners to each checkbox for immediate visual feedback
    ingredientCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateIngredientLabelVisual(checkbox);
        });
    });

    /**
     * Determines which recipes can be made based on the user's selected ingredients.
     */
    const suggestRecipes = () => {
        // Get the currently selected ingredients
        const selectedIngredients = Array.from(ingredientCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const matchingRecipes = [];

        // Iterate through all defined recipes
        recipes.forEach(recipe => {
            // Check if all ingredients required for the current recipe are present in the selectedIngredients
            const hasAllIngredients = recipe.ingredients.every(requiredIngredient =>
                selectedIngredients.includes(requiredIngredient)
            );

            if (hasAllIngredients) {
                matchingRecipes.push(recipe.name);
            }
        });

        // Clear previous results
        recipeListUl.innerHTML = '';
        noRecipeMessageP.classList.add('hidden');
        recipeResultsDiv.classList.remove('hidden'); // Ensure the results box is visible

        // Display results
        if (matchingRecipes.length > 0) {
            // If matching recipes are found, display them as a list
            matchingRecipes.forEach(recipeName => {
                const listItem = document.createElement('li');
                listItem.textContent = recipeName;
                recipeListUl.appendChild(listItem);
            });
        } else {
            // If no recipes are found, display the "No recipe found" message
            recipeListUl.innerHTML = ''; // Ensure the list is empty
            noRecipeMessageP.classList.remove('hidden');
        }
    };

    /**
     * Resets all ingredient selections and clears the recipe results display.
     */
    const clearSelections = () => {
        // Uncheck all checkboxes
        ingredientCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            updateIngredientLabelVisual(checkbox); // Update visual feedback
        });

        // Hide the results box and clear its content
        recipeResultsDiv.classList.add('hidden');
        recipeListUl.innerHTML = '';
        noRecipeMessageP.classList.add('hidden');
    };

    // Attach event listeners to the buttons
    suggestRecipesBtn.addEventListener('click', suggestRecipes);
    clearBtn.addEventListener('click', clearSelections);

    // Initialize visual state on load (in case some checkboxes are pre-checked via browser state)
    initializeIngredientLabelVisuals();
});
