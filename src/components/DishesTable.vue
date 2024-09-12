<template>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th class="min-column">Ingrediente principal</th>
          <th class="min-column">% de ingrediente en peso</th>
          <th class="min-column">kcal por 100 g</th>
          <th class="min-column">Favorito</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dish in dishes" :key="dish.id" :class="{ 'selected-row': dish === selectedDish }"
          @click="selectDish(dish)">
          <td class="min-column">{{ dish.nombre }}</td>
          <td>{{ dish.descripcion }}</td>
          <td>{{ dish.ingrediente.nombre }}</td>
          <td class="right">{{ dish.cantidadIngredientePrincipal }}</td>
          <td class="right">{{ dish.calorias }}</td>
          <td class="center">
            <span v-if="dish.favorito" class="check-mark">✔️</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="actions">
    <button class="create-button" @click="addDish">Agregar</button>
    <button class="edit-button" @click="editDish" :disabled="!selectedDish">Editar</button>
    <button class="delete-button" @click.stop="showDeleteModal" :disabled="!selectedDish">Eliminar</button>
  </div>

</template>


<script>
export default {
  // data() {
  //   return {
  //     selectedDish: Object
  //   };
  // },
  props: {
    dishes: Array,
    selectedDish: Object
  },
  emits: ['selectDish', 'addDish', 'editDish', 'showDeleteModal'],
  methods: {
    selectDish(dish) {
      //this.selectedDish = dish;
      this.$emit('selectDish', dish);
    },
    addDish() {
      this.$emit('addDish');
    },
    editDish() {
      this.$emit('editDish');
    },
    showDeleteModal() {
      this.$emit('showDeleteModal');
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

.check-mark {
  color: green;
}

.center {
  text-align: center;
}

.right {
  text-align: right;
}

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
  background-color: #6fff6f;
}

/* Estilos específicos para el componente DishList */
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