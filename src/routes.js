import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
    props: true,
  },
  {
    path: "/about/",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/favorites",
    name: "FavoritesPage",
    component: () => import("./pages/UserPages/FavoritesPage"),
  },
  {
    path: "/my-recipes",
    name: "MyRecipesPage",
    component: () => import("./pages/UserPages/MyRecipesPage"),
  },
  {
    path: "/family-recipes",
    name: "FamilyRecipePage",
    component: () => import("./pages/UserPages/FamilyRecipePage"),
  },
  {
    path: "/MealPlanning",
    name: "MealPlanning",
    component: () => import("./pages/MealPlanningPage"),
  },
  {
    path: "/:MakeRecipeid",
    name: "MakeRecipeid",
    component: () => import("./pages/MakeRecipePage"),
    props: true, // This will pass the route params as props to the component
  },
];

export default routes;
