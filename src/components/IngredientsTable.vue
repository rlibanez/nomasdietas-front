<template>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th class="min-column">Calorías por 100 gramos</th>
          <th class="min-column">Mostrar platos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ingredient in ingredients" :key="ingredient.id"
          :class="{ 'selected-row': ingredient === selectedIngredient }" @click="selectIngredient(ingredient)">
          <td>{{ ingredient.nombre }}</td>
          <td >{{ ingredient.descripcion }}</td>
          <td class="right">{{ ingredient.calorias }}</td>
          <td class="center">
            <button class="arrow-button" @click.stop="showDishes(ingredient.id)">
              ➡️
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="actions">
    <button class="create-button" @click="addIngredient">Agregar</button>
    <button class="edit-button" @click="editIngredient" :disabled="!selectedIngredient">Editar</button>
    <button class="delete-button" @click.stop="showDeleteModal" :disabled="!selectedIngredient">Eliminar</button>
  </div>

</template>


<script>
export default {
  // data() {
  //   return {
  //     selectedIngredient: Object
  //   };
  // },
  props: {
    ingredients: Array,
    selectedIngredient: Object
  },
  emits: ['selectIngredient', 'addIngredient', 'editIngredient', 'showDeleteModal', 'showDishes'],
  methods: {
    selectIngredient(ingredient) {
      //this.selectedIngredient = ingredient;
      this.$emit('selectIngredient', ingredient);
    },
    addIngredient() {
      this.$emit('addIngredient');
    },
    editIngredient() {
      this.$emit('editIngredient');
    },
    showDeleteModal() {
      this.$emit('showDeleteModal');
    },
    showDishes(ingredientId) {  
      this.$emit('showDishes', ingredientId);
      this.$router.push({ name: 'DishesByIngredient', params: { id: ingredientId } });
    }
  }
};
</script>


<style scoped>
.min-column {
  /* width: min-content; */
  width: 1%;
  white-space: nowrap;
}

.actions {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.center {
  text-align: center;
}

.right {
  text-align: right;
}

button.create-button {
  background-color: #28a745;
  /* Verde */
}

button.edit-button {
  background-color: #007bff;
  /* Azul */
}

button.delete-button {
  background-color: #dc3545;
  /* Rojo */
}

button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  color: white;
  border: none;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.selected-row {
  background-color: #d3d3d3;
}

/* Estilos específicos para el componente IngredientList */
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

.table-container {
  max-height: 400px;
  overflow-y: auto;
  position: relative;
}

th {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #f2f2f2;
  color: #333;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}

button.arrow-button {
  background: none;
  border: none;
  /* font-size: 1.5rem; */
  color: inherit;
  cursor: pointer;
}

button.arrow-button:hover {
  color: #007bff; /* Puedes cambiar el color al hacer hover si lo deseas */
}
</style>