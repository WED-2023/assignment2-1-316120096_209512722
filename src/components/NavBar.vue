<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" id="omer">
      <b-navbar-brand class="name" href="/"
        ><img src="@/assets/images/navbarlogo.png" class="img-brand" />
      </b-navbar-brand>
      <router-link class="link" :to="{ name: 'main' }">Recipes</router-link>
      <router-link class="link" :to="{ name: 'about' }">About</router-link>
      <router-link class="link" :to="{ name: 'search' }">Search</router-link>
      <span class="user" v-if="$root.store.username">
        <b-button @click="showModal = true">New Recipe</b-button>
        <b-modal v-model="showModal" title="New Recipe" size="xl">
          <FormRecipe />
        </b-modal>
      </span>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <span class="user" v-if="$root.store.username">
        <b-button @click="$router.push({ name: 'MealPlanning' })"
          >Meal Planning ({{ $root.store.count }})</b-button
        >
      </span>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <span class="user" v-if="!$root.store.username">
            <em class="guest">Hello Guest</em>
            <b-button
              class="my-2 my-sm-0 login-btn"
              @click="
                () => {
                  this.$router.push('/login');
                }
              "
              >Log In</b-button
            >
            <b-button
              class="my-2 my-sm-0 signup-btn"
              @click="
                () => {
                  this.$router.push('/register');
                }
              "
              >Sign Up</b-button
            >
          </span>
          <span class="user" v-else>
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>{{ $root.store.username }}</em>
              </template>

              <router-link class="dropdown-item" :to="{ name: 'FavoritesPage' }"
                >Favorites 🩵</router-link
              >
              <router-link class="dropdown-item" :to="{ name: 'MyRecipesPage' }"
                >My recipes</router-link
              >
              <router-link
                class="dropdown-item"
                :to="{ name: 'FamilyRecipePage' }"
                >Family recipes 👩‍👩‍👦‍👦</router-link
              >
            </b-nav-item-dropdown>
            <b-button class="signout" @click="logout">Log out</b-button>
          </span>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {
  BNavbar,
  BNavbarBrand,
  BNavbarToggle,
  BNavbarNav,
  BNavForm,
  BFormInput,
  BButton,
  BCollapse,
  BNavItemDropdown,
  BModal,
} from "bootstrap-vue";
import FormRecipe from "@/components/FormRecipe.vue";
import { getRecipeslen } from "../services/mealPlanning.js";

export default {
  components: {
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BNavbarNav,
    BNavForm,
    BFormInput,
    BButton,
    BCollapse,
    BNavItemDropdown,
    BModal,
    FormRecipe,
  },
  props: {
    logout: {
      required: true,
    },
  },
  mounted() {},
  data() {
    return {
      mealCount: this.$root.store.count,

      showModal: false,
    };
  },
  name: "NavBar",

  methods: {
    async update() {
      this.mealCount = await getRecipeslen();
    },
  },
};
</script>

<style scoped>
.img-brand {
  width: 80px;
  height: 70px;
  border-radius: 20%;
  background-color: #ffffff00;
}
.user {
  display: flex;
  padding: 1rem;
  align-items: center;
}
.guest {
  color: #fefcfc; /* Change color of "Guest" text */
  font-weight: bold;
  margin-right: 1rem; /* Add margin between "Guest" text and buttons */
}

.name {
  font-size: x-large;
  font-weight: bold;
}
.nav-link {
  color: #a69f9d;
  font-weight: bold;
}
.link {
  font-weight: bold;
  color: #cacaca;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease;
  font-size: x-large;
}
.link:hover {
  color: #ffffff; /* Change background color on hover */
}

.search-button {
  background-color: #28a745;
}
.login-btn {
  margin-right: 0.5rem; /* Add right margin to create space */
}

.signup-btn {
  margin-left: 0.5rem; /* Add left margin to create space */
}
.search-button:hover {
  background-color: #218838;
}
.login-btn,
.signup-btn {
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.login-btn {
  background-color: #007bff; /* Bootstrap's primary color */
  border-color: #007bff;
}

.login-btn:hover {
  background-color: #0056b3; /* Darker shade for hover effect */
  border-color: #0056b3;
}

.signup-btn {
  background-color: #28a745; /* Bootstrap's success color */
  border-color: #28a745;
}

.signup-btn:hover {
  background-color: #044312; /* Darker shade for hover effect */
  border-color: #085318;
}
.signout {
  background-color: #ee8a94; /* Bootstrap's danger color */
  border-color: #dc3545;
  font-weight: bold;
}
.modal-dialog {
  max-width: 90%; /* Increase the size of the modal */
}
</style>
