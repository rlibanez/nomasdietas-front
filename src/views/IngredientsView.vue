<template>
  <div class="ingredients-view">
    <h2>{{ $t('ingredients') }}</h2>

    <div class="left-panel">
      <IngredientsTable ref="ingredientsTable" :ingredients="ingredients" :selectedIngredient="selectedIngredient"
        @selectIngredient="selectIngredient" @addIngredient="addIngredient" @editIngredient="editIngredient"
        @showDeleteModal="showDeleteModal" />
    </div>

    <div class="right-panel" v-if="isEditing || isAdding">
      <IngredientForm :ingredient="selectedIngredient" :mode="isEditing ? 'edit' : 'add'" @save="handleSave"
        @cancel="cancelEdit" />
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>{{ errorMessage || $t('areYouSure') }}</p>
        <button v-if="!errorMessage" @click="deleteIngredient">{{ $t('yes') }}</button>
        <button @click="showModal = false">{{ errorMessage ? $t('accept') : $t('no') }}</button>
      </div>
    </div>

  </div>
</template>

<script>
import IngredientsTable from '@/components/IngredientsTable.vue';
import IngredientForm from '@/components/IngredientsForm.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  components: {
    IngredientsTable,
    IngredientForm
  },
  data() {
    return {
      ingredients: [],
      selectedIngredient: null,
      isEditing: false,
      isAdding: false,
      showModal: false,
      errorMessage: null
    };
  },
  async created() {
    await this.fetchIngredients();
    const ingredientId = Number(this.$route.params.id);
    if (ingredientId) {
      console.log('async created Ingrediente seleccionado:', ingredientId);
      this.selectIngredientById(ingredientId);
    }
  },
  // mounted() {
  //     document.addEventListener('click', this.handleClickOutside);
  // },
  // beforeUnmount() {
  //     document.removeEventListener('click', this.handleClickOutside);
  // },
  watch: {
    '$route.params.id': function (newId) {
      if (newId) {
        this.fetchIngredients();
        this.selectIngredientById(Number(newId));
      } else {
        this.fetchIngredients();
        this.selectedIngredient = null;
      }
    }
  },
  methods: {
    async fetchIngredients() {
      try {
        const response = await axios.get('/api/ingrediente');
        this.ingredients = response.data;

        const ingredientId = Number(this.$route.params.id);
        if (ingredientId) {
          this.selectIngredientById(ingredientId);
        }
      } catch (error) {
        const toast = useToast();
        toast.error(`Error cargando ingredientes`);
      }
    },
    selectIngredientById(id) {
      const ingredient = this.ingredients.find(ingredient => ingredient.id === Number(id));
      if (ingredient) {
        console.log('selectIngredientById Ingrediente seleccionado:', id);
        this.selectedIngredient = ingredient;
      }
      else {
        console.log('selectIngredientById Ingrediente no existe:', id);
        this.selectedIngredient = null;
      }
    },
    // Método emitido por IngredientsTable
    selectIngredient(ingredient) {
      console.log('selectIngredient Ingrediente seleccionado:', ingredient.id);
      this.selectedIngredient = ingredient;
      this.$router.push(`/ingredients/${ingredient.id}`);
    },
    addIngredient() {
      this.selectedIngredient = {};
      this.isAdding = true;
      this.isEditing = false;
      this.showModal = false;
    },
    editIngredient() {
      if (this.selectedIngredient) {
        this.isEditing = true;
        this.isAdding = false;
      }
    },
    cancelEdit() {
      this.fetchIngredients();
      this.isEditing = false;
      this.isAdding = false;
    },
    async deleteIngredient() {
      if (!this.selectedIngredient) return;

      const toast = useToast();
      try {
        await axios.delete(`/api/ingrediente/${this.selectedIngredient.id}`);
        this.ingredients = this.ingredients.filter(u => u.id !== this.selectedIngredient.id);
        toast.success(`El ingrediente ${this.selectedIngredient.nombre} se ha borrado.`);
        this.selectedIngredient = null;
        this.showModal = false;
      } catch (error) {
        this.errorMessage = `El ingrediente ${this.selectedIngredient.nombre} tiene platos asociados, no se puede borrar.`;
        toast.error(`El ingrediente ${this.selectedIngredient.nombre} no se ha borrado.`);
      } finally {
        this.fetchIngredients();
      }
    },
    async confirmDelete() {
      if (this.selectedIngredient) {
        this.showDeleteModal();
      }
    },

    handleErrorConfirmation() {
      if (this.errorMessage) {
        const toast = useToast();
        toast.error(this.errorMessage);
      }
      this.showModal = false;
    },

    showDeleteModal() {
      this.errorMessage = null
      this.showModal = true
    },

    async saveIngredient(ingredient) {
      if (this.isEditing) {
        await axios.put(`/api/ingrediente/${ingredient.id}`, ingredient);
      } else if (this.isAdding) {
        await axios.post('/api/ingrediente', ingredient);
      }
      this.isEditing = false;
      this.isAdding = false;
      this.fetchIngredients();
    },


    async handleSave(ingredient) {
      const toast = useToast();
      try {
        if (this.isEditing) {
          await axios.put('/api/ingrediente', ingredient);
          toast.success(`El ingrediente ${ingredient.nombre} se ha actualizado`);
        } else
          if (this.isAdding) {
            await axios.post('/api/ingrediente', ingredient);
            toast.success(`El ingrediente ${ingredient.nombre} se ha creado`);
          }
        this.isEditing = false;
        this.isAdding = false;
        this.fetchIngredients();
      } catch (error) {
        toast.error(`Error al guardar el ingrediente ${ingredient.nombre}`);
      }
    },

    async handleIngredientSaved(updatedIngredient) {
      const toast = useToast();
      toast.info(`Updating ingredient with id ${updatedIngredient.id}...`);
      try {
        const response = await axios.put(`/api/ingrediente`, updatedIngredient);
        const updatedIngredientData = response.data;
        const index = this.ingredients.findIndex(ingredient => ingredient.id === updatedIngredientData.id);
        if (index !== -1) {
          this.ingredient.splice(index, 1, {
            id: updatedIngredientData.id,
            firstName: updatedIngredientData.nombre,
            lastName: updatedIngredientData.apellidos,
            anno: updatedIngredientData.annoNacimiento
          });
        }
        toast.success(`Ingredient with id ${updatedIngredientData.id} updated successfully.`);
      } catch (error) {
        toast.error(`Error updating ingredient with id ${updatedIngredient.id}.`);
      } finally {
        window.location.reload();
      }
    },

    // handleClickOutside(event) {
    //     const table = this.$refs.ingredientsTable.$el;
    //     if (!table.contains(event.target)) {
    //         console.log('Evento Click fuera de la tabla');
    //         this.selectedIngredient = null;
    //         //this.$router.push('/ingredients');
    //     } else {
    //         console.log('Evento Click en la tabla');
    //     }
    // }
  }
};
</script>

<style scoped>
.ingredients-view {
  margin: 1rem 0rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}

tr.selected {
  background-color: #d3d3d3;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  text-align: center;
}

.modal-content button {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #ff4d4d;
  color: white;
  border: none;
  cursor: pointer;
}

.modal-content button:last-child {
  background-color: #ccc;
  color: black;
}
</style>
