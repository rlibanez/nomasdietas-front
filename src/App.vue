<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="logo-title-container">
      <img alt="Cado logo" class="logo" src="/avocado2.png" width="50" height="50" />
      <h1 class="green">No Más Dietas!</h1>
    </div>
    <div class="wrapper">
      <nav>
        <router-link to="/" class="nav-link">{{ $t('home') }}</router-link>
        <router-link to="/ingredients" class="nav-link">{{ $t('ingredients') }}</router-link>
        <router-link to="/dishes" class="nav-link">{{ $t('dishes') }}</router-link>
        <router-link to="/about" class="nav-link">{{ $t('about') }}</router-link>
      </nav>
    </div>
  </header>

  <div class="content">
    <RouterView />
  </div>
</template>


<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-title-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  margin-right: 1rem;
}

nav {
  width: 100%;
  font-size: 16px;
  text-align: center;
  margin-top: 1rem;
}

nav a.router-link-active {
  color: var(--color-text);
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.content {
  margin-top: 3rem;
  padding-left: 1rem;
}
</style>
