<template>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ingredient in ingredients" :key="ingredient.id"
          :class="{ 'selected-row': ingredient === selectedIngredient }" @click="selectIngredient(ingredient)">
          <td>{{ ingredient.nombre }}</td>
          <td>{{ ingredient.descripcion }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="actions">
    <button class="create-button" @click="addIngredient">Agregar Ingrediente</button>
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
  emits: ['selectIngredient', 'addIngredient', 'editIngredient', 'showDeleteModal'],
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
    }
  }
};
</script>


<style scoped>
.actions {
  margin-top: 1rem;
  margin-bottom: 1rem;
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
  /* Altura máxima ajustable */
  overflow-y: auto;
  position: relative;
  /* Necesario para hacer que el sticky funcione correctamente */
}

th {
  position: sticky;
  top: 0;
  z-index: 2;
  /* Aumenta el z-index del encabezado */
  background-color: #f2f2f2;
  /* Asegúrate de que tenga un fondo sólido */
  color: #333;
  /* Color del texto */
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  /* Añade un ligero sombreado para mayor visibilidad */
}
</style>