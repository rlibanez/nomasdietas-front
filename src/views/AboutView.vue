<template>
  <div class="about-view">
    <h2>{{ $t('about') }}</h2>
    <div class="content">
      <img src="/images/avocado1.png" alt="Avocado Logo" class="about-image" width="150" height="150"/>
      <div class="text-content">
        <p>Autor: Roberto López Ibáñez</p>
        <p>Correo: <a href="mailto:rlibanez@cic.es">rlibanez@cic.es</a></p>
        <p>GitHub: <a href="https://github.com/rlibanez/nomasdietas-front"
            target="_blank">https://github.com/rlibanez/nomasdietas-front</a></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  margin: 1rem 0rem;
}

.about-view h2 {
  margin-bottom: 1rem;
}

.content {
  display: flex;
  align-items: flex-start;
}

.about-image {
  max-width: 150px;
  height: auto;
  margin-right: 1rem;
}

.text-content {
  display: flex;
  flex-direction: column;
}

.text-content p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.text-content a {
  color: #42b983;
  text-decoration: none;
}

.text-content a:hover {
  text-decoration: underline;
}
</style>
