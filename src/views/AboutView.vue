<template>
  <div class="about-view">
    <h2>{{ $t('about') }}</h2>
    <p>Proyecto final individual</p>
    <p>Autor: Roberto López Ibáñez</p>
    <p>Correo: <a href="mailto:rlibanez@cic.es">rlibanez@cic.es</a></p>
    <p>GitHub: <a href="https://github.com/rlibanez/nomasdietas-front"
        target="_blank">https://github.com/rlibanez/nomasdietas-front</a></p>
  </div>
</template>

<style scoped>
.about-view {
  margin: 1rem 0rem;
}

.about-view h2 {
  margin-bottom: 1rem;
}

.about-view p {
  margin: 0.5rem 0;
}

.about-view a {
  color: #42b983;
  text-decoration: none;
}

.about-view a:hover {
  text-decoration: underline;
}
</style>
