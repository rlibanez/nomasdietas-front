<template>
  <div class="details-form">
    <h2>{{ title }}</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="nombre">Nombre:
          <input type="text" id="nombre" v-model="ingredient.nombre" />
        </label>
      </div>
      <div>
        <label for="descripcion">Descripción:
          <input type="text" id="descripcion" v-model="ingredient.descripcion" />
        </label>
      </div>

      <div>
        <label for="calorias">Calorías por 100 gramos:
          <input type="number" id="calorias" v-model="ingredient.calorias" min="0" class="right-aligned"/>
        </label>
      </div>
      <div class="details-buttons">
        <button class="save-button" type="submit">Guardar</button>
        <button class="cancel-button" type="button" @click="cancelForm">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    ingredient: {
      type: Object,
      required: true
    },
    mode: String
  },
  computed: {
    title() {
      return this.mode === 'edit' ? 'Editar' : 'Nuevo';
    }
  },
  methods: {
    submitForm() {
      this.$emit('save', this.ingredient);
    },
    cancelForm() {
      this.$emit('cancel');
    }
  },
  mounted() {

    this.$nextTick(() => {
      this.$el.scrollIntoView({ behavior: 'smooth' });
    });
  }
};
</script>

<style scoped>
.right-aligned {
  text-align: right;
}

button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  color: white;
  border: none;
  cursor: pointer;
}

.details-form {
  margin-top: 2rem;
}

.details-form label {
  display: block;
  margin-bottom: 1rem;
}

.details-form input[type="text"],
.details-form input[type="datetime-local"],
.details-form select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
}

.details-form input[type="checkbox"] {
  margin-left: 0.5rem;
}

.details-buttons {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.details-buttons .save-button {
  padding: 0.5rem 1rem;
  background-color: #28a745;
  /* Verde */
  color: white;
  border: none;
  cursor: pointer;
}

.details-buttons .cancel-button {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  /* Rojo */
  color: white;
  border: none;
  cursor: pointer;
}
</style>