<template>
  <div class="add-recipe-page">
    <h1 class="title">Add a New Recipe</h1>
    <div class="card add-recipe-card">
      <form
        v-if="!success"
        class="form-card"
        @submit.prevent="onSubmit"
        enctype="multipart/form-data"
      >
        <div class="form-group">
          <label for="title">Title<span class="text-danger">*</span></label>
          <input
            type="text"
            id="title"
            v-model="form.title"
            placeholder="Enter the recipe title"
            class="add-recipe-input"
            required
          />
          <small v-if="errors.title" class="text-danger">{{
            errors.title[0]
          }}</small>
        </div>
        <div class="form-group">
          <label for="image">Image<span class="text-danger">*</span></label>
          <div class="custom-file">
            <input
              type="file"
              id="image"
              @change="selectImage"
              class="custom-file-input"
              required
            />
            <label class="custom-file-label" for="image">Choose image</label>
          </div>
          <small v-if="errors.image" class="text-danger">{{
            errors.image[0]
          }}</small>
        </div>
        <div class="form-group">
          <label for="description"
            >Description<span class="text-danger">*</span></label
          >
          <textarea
            id="description"
            v-model="form.description"
            placeholder="Enter the recipe description"
            class="add-recipe-input"
            required
          ></textarea>
          <small v-if="errors.description" class="text-danger">{{
            errors.description[0]
          }}</small>
        </div>
        <div class="form-group">
          <label for="readyInMinutes"
            >Ready in (min)<span class="text-danger">*</span></label
          >
          <div class="input-group">
            <input
              type="number"
              id="readyInMinutes"
              v-model="form.readyInMinutes"
              placeholder="Enter minutes"
              class="add-recipe-input"
              required
            />
          </div>
          <small v-if="errors.readyInMinutes" class="text-danger">{{
            errors.readyInMinutes[0]
          }}</small>
        </div>
        <div class="form-group">
          <label for="instructions"
            >Instructions<span class="text-danger">*</span></label
          >
          <div
            v-for="(instruction, index) in form.instructions"
            :key="index"
            class="d-flex mb-2"
          >
            <input
              type="text"
              class="add-recipe-input"
              v-model="form.instructions[index]"
              required
            />
            <button
              type="button"
              class="btn btn-danger btn-sm ml-2"
              @click="removeInstruction(index)"
            >
              Remove
            </button>
          </div>
          <button
            type="button"
            class="btn btn-secondary btn-sm mt-2"
            @click="addInstruction"
          >
            Add Instruction
          </button>
          <small v-if="errors.instructions" class="text-danger">{{
            errors.instructions[0]
          }}</small>
        </div>
        <div class="form-group">
          <label for="ingredients"
            >Ingredients<span class="text-danger">*</span></label
          >
          <div
            v-for="(ingredient, index) in form.ingredients"
            :key="index"
            class="d-flex mb-2"
          >
            <input
              type="text"
              class="add-recipe-input"
              v-model="form.ingredients[index]"
              required
            />
            <button
              type="button"
              class="btn btn-danger btn-sm ml-2"
              @click="removeIngredient(index)"
            >
              Remove
            </button>
          </div>
          <button
            type="button"
            class="btn btn-secondary btn-sm mt-2"
            @click="addIngredient"
          >
            Add Ingredient
          </button>
          <small v-if="errors.ingredients" class="text-danger">{{
            errors.ingredients[0]
          }}</small>
        </div>
        <div class="form-group">
          <button
            type="submit"
            class="btn btn-primary btn-block add-recipe-btn"
          >
            Add Recipe
          </button>
        </div>
      </form>
      <div v-else class="alert alert-success">
        Thank you for submitting your recipe!
      </div>
    </div>
  </div>
</template>

<script>
import { mockAddUserRecipes } from "../services/recipes.js";

export default {
  data() {
    return {
      form: {
        title: "",
        image: "",
        description: "",
        readyInMinutes: "",
        instructions: [""],
        ingredients: [""],
      },
      errors: {},
      success: false,
    };
  },
  methods: {
    selectImage(event) {
      if (event.target && event.target.files && event.target.files[0]) {
        this.form.image = event.target.files[0];
      }
    },
    async onSubmit() {
      try {
        const formData = new FormData();
        formData.append("title", this.form.title);
        formData.append("image", this.form.image);
        formData.append("description", this.form.description);
        formData.append("readyInMinutes", this.form.readyInMinutes);
        formData.append("instructions", JSON.stringify(this.form.instructions));
        formData.append("ingredients", JSON.stringify(this.form.ingredients));

        await mockAddUserRecipes(formData);

        this.success = true;
        this.resetForm();
      } catch (error) {
        this.errors = error.response.data.errors || {};
      }
    },
    addInstruction() {
      this.form.instructions.push("");
    },
    removeInstruction(index) {
      this.form.instructions.splice(index, 1);
    },
    addIngredient() {
      this.form.ingredients.push("");
    },
    removeIngredient(index) {
      this.form.ingredients.splice(index, 1);
    },
    resetForm() {
      this.form = {
        title: "",
        image: "",
        description: "",
        readyInMinutes: "",
        instructions: [""],
        ingredients: [""],
      };
      this.errors = {};
    },
  },
};
</script>

<style scoped>
.add-recipe-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-image: url("@/assets/images/vecteezy_spices-for-use-as-cooking-ingredients-on-a-wooden-background_3823542.jpg");
  background-size: cover;
  background-position: center;
}

.title {
  color: #e8eaec;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.card {
  width: 100%;
  max-width: 700px;
  padding: 2rem;
  background-color: #f3f3f379;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

.add-recipe-input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.add-recipe-input:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.custom-file-input {
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.custom-file-input:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn {
  transition: all 0.15s ease-in-out;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.text-danger {
  color: #dc3545;
}

.alert-success {
  color: #155724;
  background-color: #d4edda;
  border-color: #c3e6cb;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}
</style>
