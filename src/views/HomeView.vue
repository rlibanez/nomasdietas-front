<template>
  <div class="home-view">
    <h2>{{ $t('welcome') }}</h2>
    <img class="responsive-image" src="/images/welcome.jpg" alt="Plato saludable" />
  </div>
</template>

<style scoped>
.home-view {
  margin: 1rem 0rem;
}

.responsive-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1rem auto;
}
</style>