<template>
  <div class="dishes-view">
    <h2>{{ pageTitle }}</h2>

    <div class="dishes-table">
      <DishesTable ref="dishesTable" :dishes="dishes" :selectedDish="selectedDish" @selectDish="selectDish"
        @addDish="addDish" @editDish="editDish" @showDeleteModal="showDeleteModal" />
    </div>

    <div class="dishes-form" v-if="isEditing || isAdding">
      <DishForm :dish="selectedDish" :mode="isEditing ? 'edit' : 'add'" @save="handleSave" @cancel="cancelEdit" />
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>¿Estás seguro de que deseas eliminar este plato?</p>
        <button @click="confirmDelete">{{ $t('yes') }}</button>
        <button @click="showModal = false">{{ $t('no') }}</button>
      </div>
    </div>

  </div>
</template>

<script>
import DishesTable from '@/components/DishesTable.vue';
import DishForm from '@/components/DishesForm.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  components: {
    DishesTable,
    DishForm
  },
  data() {
    return {
      dishes: [],
      selectedDish: null,
      isEditing: false,
      isAdding: false,
      showModal: false,
      selectedIngredient: null
    };
  },
  async created() {
    // await this.fetchDishes();
    const routeId = Number(this.$route.params.id);
    if (this.$route.name === 'DishesByIngredient') {
      // Si la ruta es /dishes/byingredient/:id, cargar platos por ingrediente
      await this.fetchDishesByIngredient(routeId);
    } else if (this.$route.name === 'DishDetails') {
      // Si la ruta es /dishes/:id, seleccionar el plato correspondiente
      await this.fetchDishes();
      this.selectDishById(routeId);
    } else {
      // Cargar todos los platos en la ruta general /dishes
      await this.fetchDishes();
    }
  },
  // mounted() {
  //     document.addEventListener('click', this.handleClickOutside);
  // },
  // beforeUnmount() {
  //     document.removeEventListener('click', this.handleClickOutside);
  // },
  computed: {
    pageTitle() {
      return this.$route.name === 'DishesByIngredient' ? this.$t('dishesfiltered') : this.$t('dishes');
    }
  },
  watch: {
    '$route.params.id': function (newId) {
      if (this.$route.name === 'DishesByIngredient') {
        this.fetchDishesByIngredient(newId); // Filtra platos por ingrediente
      } else if (this.$route.name === 'DishDetails') {
        this.selectDishById(newId); // Selecciona el plato por id
      } else {
        this.fetchDishes(); // Carga todos los platos
      }
    }
  },
  methods: {
    async fetchDishes() {
      try {
        const response = await axios.get('/api/plato');
        this.dishes = response.data;

        const dishId = Number(this.$route.params.id);
        if (dishId) {
          this.selectDishById(dishId);
        }
      } catch (error) {
        const toast = useToast();
        toast.error(`Error cargando platos`);
      }
    },
    selectDishById(id) {
      const dish = this.dishes.find(dish => dish.id === Number(id));
      if (dish) {
        console.log('selectDishById Dishe seleccionado:', id);
        this.selectedDish = dish;
      }
      else {
        console.log('selectDishById Dishe no existe:', id);
        this.selectedDish = null;
      }
    },
    async fetchDishesByIngredient(ingredientId) {
      try {
        console.log('fetchDishesByIngredient ingrediente seleccionado:', ingredientId);
        const response = await axios.get(`/api/ingrediente/platos/${ingredientId}`);
        this.dishes = response.data;
      } catch (error) {
        console.error('Error al cargar platos por ingrediente:', error);
      }
    },

    // Método emitido por DishesTable
    selectDish(dish) {
      console.log('selectDish Dishe seleccionado:', dish.id);
      this.selectedDish = dish;
      this.$router.push(`/dishes/${dish.id}`);
    },
    addDish() {
      console.log('addDish()');
      this.selectedDish = {};
      this.isAdding = true;
      this.isEditing = false;
      this.showModal = false;
    },
    editDish() {
      if (this.selectedDish) {
        this.isEditing = true;
        this.isAdding = false;
      }
    },
    cancelEdit() {
      this.fetchDishes();
      this.isEditing = false;
      this.isAdding = false;
    },
    async confirmDelete() {
      if (!this.selectedDish) return

      this.isEditing = false;
      const toast = useToast();
      try {
        await axios.delete(`/api/plato/${this.selectedDish.id}`);
        this.dishes = this.dishes.filter(u => u.id !== this.selectedDish.id);
        toast.success(`El plato ${this.selectedDish.nombre} se ha borrado.`);
        this.selectedDish = null;
        this.showModal = false;
      } catch (error) {
        toast.error(`Error al borrar el plato ${this.selectedDish.nombre}.`);
      } finally {
        this.fetchDishes();
      }
    },

    showDeleteModal() {
      this.showModal = true
    },

    async saveDish(dish) {
      if (this.isEditing) {
        await axios.put(`/api/plato/${dish.id}`, dish);
      } else if (this.isAdding) {
        await axios.post('/api/plato', dish);
      }
      this.isEditing = false;
      this.isAdding = false;
      this.fetchDishes();
    },


    async handleSave(dish) {
      const toast = useToast();
      try {
        if (this.isEditing) {
          await axios.put('/api/plato', dish);
          toast.success(`El plato ${dish.nombre} se ha actualizado`);
        } else
          if (this.isAdding) {
            await axios.post('/api/plato', dish);
            toast.success(`El plato ${dish.nombre} se ha creado`);
          }
        this.isEditing = false;
        this.isAdding = false;
        this.fetchDishes();
      } catch (error) {
        toast.error(`Error al guardar el plato ${dish.nombre}`);
      }
    },

    async handleDishSaved(updatedDish) {
      const toast = useToast();
      toast.info(`Updating dish with id ${updatedDish.id}...`);
      try {
        const response = await axios.put(`/api/plato`, updatedDish);
        const updatedDishData = response.data;
        const index = this.dishes.findIndex(dish => dish.id === updatedDishData.id);
        if (index !== -1) {
          this.dish.splice(index, 1, {
            id: updatedDishData.id,
            firstName: updatedDishData.nombre,
            lastName: updatedDishData.apellidos,
            anno: updatedDishData.annoNacimiento
          });
        }
        toast.success(`Dish with id ${updatedDishData.id} updated successfully.`);
      } catch (error) {
        toast.error(`Error updating dish with id ${updatedDish.id}.`);
      } finally {
        window.location.reload();
      }
    },

    showDishes(ingredient) {
      this.selectedIngredient = ingredient;
    }

    // handleClickOutside(event) {
    //     const table = this.$refs.dishesTable.$el;
    //     if (!table.contains(event.target)) {
    //         console.log('Evento Click fuera de la tabla');
    //         this.selectedDish = null;
    //         //this.$router.push('/dishes');
    //     } else {
    //         console.log('Evento Click en la tabla');
    //     }
    // }
  }
};
</script>

<style scoped>
.dishes-view .dishes-table{
  margin: 1rem 0rem;
}

.dish-list {
  margin: 2rem;
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
