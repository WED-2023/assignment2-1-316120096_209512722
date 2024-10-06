// src/services/user.js
import e from "cors";
import recipe_full_view from "../assets/mocks/recipe_full_view.json";
import recipe_preview from "../assets/mocks/recipe_preview.json";
import family_recipes_preview from "../assets/mocks/family_recipes_preview.json";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000"; // Base URL for your server

let favortieRecipes = [
  {
    id: 716429,
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-5ojY1OcKkJH28rahcIhDsq1Yea56K61Q18IgqA5Q33GN8-c5APvOuLVH_NmijEzvYOVY27nvR2qmVAkEq6TmTX2unEQvudFqlIV6mJ8B4Ntnfsy-Mb-ghZDdeJJmsO_FtKgrThyoqV8/s640/IMG_5392.JPG",
    title: "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
    readyInMinutes: 45,
    aggregateLikes: 209,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    summary:
      'You can never have too many main course recipes, so give Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs a try. One serving contains <b>543 calories</b>, <b>17g of protein</b>, and <b>16g of fat</b>. For <b>$1.57 per serving</b>, this recipe <b>covers 22%</b> of your daily requirements of vitamins and minerals. This recipe serves 2. A mixture of butter, white wine, pasta, and a handful of other ingredients are all it takes to make this recipe so yummy. 209 people have tried and liked this recipe. It is brought to you by fullbellysisters.blogspot.com. From preparation to the plate, this recipe takes approximately <b>45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 83%</b>, which is tremendous. If you like this recipe, take a look at these similar recipes: <a href="https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1230187">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, <a href="https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229807">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>, and <a href="https://spoonacular.com/recipes/pasta-with-garlic-scallions-cauliflower-breadcrumbs-1229669">Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs</a>.',
  },
  {
    id: 715538,
    image:
      "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/09/Beef-Stew-main.jpg",
    title: "Classic Beef Stew",
    readyInMinutes: 120,
    aggregateLikes: 350,
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    summary:
      "This Classic Beef Stew is a hearty and flavorful meal. One serving contains <b>450 calories</b>, <b>28g of protein</b>, and <b>20g of fat</b>. For <b>$2.50 per serving</b>, this recipe <b>covers 30%</b> of your daily requirements of vitamins and minerals. This recipe serves 4. A mixture of beef, carrots, potatoes, and a handful of other ingredients are all it takes to make this recipe so delicious. 350 people have tried and liked this recipe. From preparation to the plate, this recipe takes approximately <b>2 hours</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 90%</b>, which is excellent.",
  },
  {
    id: 653635,
    image:
      "https://www.destinationdelish.com/wp-content/uploads/2019/09/sheet-pan-veggie-tacos.jpg",
    title: "Vegetarian Tacos with Avocado Cream",
    readyInMinutes: 30,
    aggregateLikes: 178,
    vegetarian: true,
    vegan: false,
    glutenFree: true,
    summary:
      "These Vegetarian Tacos with Avocado Cream are a quick and delicious meal. One serving contains <b>350 calories</b>, <b>12g of protein</b>, and <b>22g of fat</b>. For <b>$1.20 per serving</b>, this recipe <b>covers 25%</b> of your daily requirements of vitamins and minerals. This recipe serves 4. A mixture of black beans, avocado, corn tortillas, and a handful of other ingredients are all it takes to make this recipe so tasty. 178 people have tried and liked this recipe. From preparation to the plate, this recipe takes approximately <b>30 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 85%</b>, which is outstanding.",
  },
];
let userRecipes = [...recipe_preview];
let familyRecipes = [...family_recipes_preview];
let watchedRecipes = [...recipe_preview];

export async function AddWatchedRecipe(username, recipeId) {
  try {
    const response = await axios.post("/user/postwatched", {
      recipeId: recipeId,
      userName: username,
    });

    return {
      status: 200,
      response: {
        data: {
          message: "The Recipe successfully marked as watched",
          success: true,
        },
      },
    };
  } catch (err) {
    if (err.response.status === 400) {
      return {
        status: 400,
        response: {
          data: {
            message: "The Recipe is already marked as watched",
            success: false,
          },
        },
      };
    }
    console.error("Error marking recipe as watched:", err);
    return {
      status: err.response.status,
      response: {
        data: {
          message: "Failed to mark the recipe as watched",
          success: false,
        },
      },
    };
  }
}
export async function GetWatchedRecipes(userName) {
  try {
    const response = await axios.get(`/user/getwatched/${userName}`);
    return {
      status: 200,
      response: {
        data: {
          recipes: response.data,
        },
      },
    };
  } catch (err) {
    console.error("Error fetching watched recipes:", err);
    return {
      status: err.response.status,
      response: {
        data: {
          message: "Failed to retrieve watched recipes",
          success: false,
        },
      },
    };
  }
}

export async function GetWatchedRecipesSorted(userName) {
  try {
    console.log("iam un sorted");
    const response = await axios.get(`/user/Sorted/${userName}`);
    return {
      status: 200,
      response: {
        data: {
          recipes: response.data,
        },
      },
    };
  } catch (err) {
    console.error("Error fetching watched recipes:", err);
    return {
      status: err.response.status,
      response: {
        data: {
          message: "Failed to retrieve watched recipes",
          success: false,
        },
      },
    };
  }
}
export async function addFavoriteRecipe(username, recipeId) {
  try {
    const response = await axios.post("/user/favorites", {
      userName: username,
      recipeId: recipeId,
    });

    return {
      status: 200,
      response: {
        data: {
          message: "The Recipe successfully marked as watched",
          success: true,
        },
      },
    };
  } catch (err) {
    if (err.response.status === 400) {
      return {
        status: 400,
        response: {
          data: {
            message: "The Recipe is already marked as watched",
            success: false,
          },
        },
      };
    }
    console.error("Error marking recipe as watched:", err);
    return {
      status: err.response.status,
      response: {
        data: {
          message: "Failed to mark the recipe as watched",
          success: false,
        },
      },
    };
  }
}
export async function getFavoriteRecipes(userName) {
  try {
    const response = await axios.get(`/user/favorites/${userName}`);
    console.log(response.data);
    return {
      status: 200,
      response: {
        data: {
          recipes: response.data,
        },
      },
    };
  } catch (err) {
    console.error("Error fetching watched recipes:", err);
    return {
      status: err.response.status,
      response: {
        data: {
          message: "Failed to retrieve watched recipes",
          success: false,
        },
      },
    };
  }
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
