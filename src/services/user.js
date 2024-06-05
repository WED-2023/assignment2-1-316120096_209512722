// src/services/user.js
import e from "cors";
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";

let favortieRecipes = [recipe_preview];
let userRecipes = [recipe_preview];
let familyRecipes = [recipe_preview];

export function mockAddFavorite(recipeId) {
  const recipe = recipe_preview.find((recipe) => recipe.id === recipeId);
  favortieRecipes.push(recipe);
  if (recipe) {
    return {
      status: 200,
      response: {
        data: {
          message: "The Recipe successfully saved as favorite",
          success: true,
        },
      },
    };
  } else {
    return {
      status: 404,
      response: {
        data: {
          message: "The Recipe not found",
          success: false,
        },
      },
    };
  }
}
export function mockGetFavorites() {
  return {
    status: 200,
    response: {
      data: {
        recipes: favortieRecipes,
      },
    },
  };
}

export function mockAddUserRecipes(recipeDetails) {
  userRecipes.push(recipeDetails);
  return {
    status: 200,
    response: {
      data: {
        message: "The Recipe successfully added to My Recipes",
        success: true,
      },
    },
  };
}
export function mockGetUserRecipes() {
  return {
    status: 200,
    response: {
      data: {
        recipes: userRecipes,
      },
    },
  };
}

export function mockAddFamilyRecipes(recipeDetails) {
  familyRecipes.push(recipeDetails);
  return {
    status: 200,
    response: {
      data: {
        message: "The Recipe successfully added to Family Recipes",
        success: true,
      },
    },
  };
}
export function mockGetFamilyRecipes() {
  return {
    status: 200,
    response: {
      data: {
        recipes: familyRecipes,
      },
    },
  };
}
