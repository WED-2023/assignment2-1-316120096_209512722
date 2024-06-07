<template>
  <div class="container-fluid px-1 py-5 mx-auto add-recipe-container">
    <div class="row d-flex justify-content-center">
      <div class="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
        <h3 class="mb-4">Add a New Recipe</h3>
        <div class="card add-recipe-card">
          <form
            v-if="!success"
            class="form-card"
            @submit.prevent="onSubmit"
            enctype="multipart/form-data"
          >
            <div class="row justify-content-between text-left">
              <div class="form-group col-sm-6 flex-column d-flex">
                <label class="form-control-label px-3" for="title"
                  >Title<span class="text-danger">*</span></label
                >
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
              <div class="form-group col-sm-6 flex-column d-flex">
                <label class="form-control-label px-3" for="image"
                  >Image<span class="text-danger">*</span></label
                >
                <div class="custom-file">
                  <input
                    type="file"
                    id="image"
                    @change="selectImage"
                    class="custom-file-input"
                    required
                  />
                  <label class="custom-file-label" for="image"
                    >Choose image</label
                  >
                </div>
                <small v-if="errors.image" class="text-danger">{{
                  errors.image[0]
                }}</small>
              </div>
            </div>
            <div class="row justify-content-between text-left">
              <div class="form-group col-sm-12 flex-column d-flex">
                <label class="form-control-label px-3" for="description"
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
            </div>
            <div class="row justify-content-between text-left">
              <div class="form-group col-sm-6 flex-column d-flex">
                <label class="form-control-label px-3" for="readyInMinutes"
                  >Ready in<span class="text-danger">*</span></label
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
                  <div class="input-group-append">
                    <span class="input-group-text">minutes</span>
                  </div>
                </div>
                <small v-if="errors.readyInMinutes" class="text-danger">{{
                  errors.readyInMinutes[0]
                }}</small>
              </div>
            </div>
            <div class="row justify-content-between text-left">
              <div class="form-group col-sm-12 flex-column d-flex">
                <label class="form-control-label px-3" for="instructions"
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
            </div>
            <div class="row justify-content-between text-left">
              <div class="form-group col-sm-12 flex-column d-flex">
                <label class="form-control-label px-3" for="ingredients"
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
            </div>
            <div class="row justify-content-end">
              <div class="form-group col-sm-6">
                <button type="submit" class="btn btn-primary btn-block">
                  Add Recipe
                </button>
              </div>
            </div>
          </form>
          <div v-else class="alert alert-success">
            Thank you for submitting your recipe!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mockAddUserRecipes } from "../services/user.js";

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
        // Prepare form data
        const formData = new FormData();
        formData.append("title", this.form.title);
        formData.append("image", this.form.image);
        formData.append("description", this.form.description);
        formData.append("readyInMinutes", this.form.readyInMinutes);
        formData.append("instructions", JSON.stringify(this.form.instructions));
        formData.append("ingredients", JSON.stringify(this.form.ingredients));

        // Call the mock function
        await mockAddUserRecipes(formData);

        // Handle success
        this.success = true;
        this.resetForm();
      } catch (error) {
        // Handle errors
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
.add-recipe-container {
  padding: 20px;
}

.add-recipe-card {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.add-recipe-input {
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.custom-file-label::after {
  content: "Browse";
}

button {
  cursor: pointer;
}

button:focus {
  outline: none;
}
</style>
