<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { locale } = useI18n()

const isActive = (path) => {
  return computed(() => {
    if (path === '/') {
      return route.path === path;
    }
    return route.path.startsWith(path);
  }).value;
}

const changeLanguage = (lang) => {
  locale.value = lang
}
</script>

<template>
  <header>
    <div class="logo-title-container">
      <img alt="Cado logo" class="logo" src="/images/avocado2.png" width="50" height="50" />
      <h1 class="green">No Más Dietas!</h1>
    </div>
    <div class="wrapper">
      <nav class="nav-center">
        <router-link to="/" class="nav-link" :class="{ active: isActive('/') }">{{ $t('home') }}</router-link>
        <router-link to="/ingredients" class="nav-link" :class="{ active: isActive('/ingredients') }">{{
          $t('ingredients') }}</router-link>
        <router-link to="/dishes" class="nav-link" :class="{ active: isActive('/dishes') }">{{ $t('dishes')
          }}</router-link>
        <router-link to="/about" class="nav-link" :class="{ active: isActive('/about') }">{{ $t('about')
          }}</router-link>
      </nav>
      <div class="language-selector">
        <!-- <label for="language">{{ $t('language') }}:</label> -->
        <select id="language" @change="changeLanguage($event.target.value)">
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  </header>

  <div class="content">
    <RouterView />
  </div>
</template>


<style scoped>
.green {
  font-size: 3rem;
}
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.logo-title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.logo {
  margin-right: 1rem;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
  position: relative;
}

nav {
  display: flex;
  gap: 1rem;
  margin-top: 0.3em;
  font-size: 18px;
  text-align: center;
}

.nav-link {
  position: relative;
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: var(--color-text);
}

/* .nav-link::before {
  content: '|';
  position: absolute;
  left: -0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text);
  z-index: 1;
} */

.nav-link:first-child::before {
  content: '';
}

.nav-link.active {
  /* font-weight: bold; */
  color: #42b983;
}

.nav-link:hover {
  background-color: #42b983;
  color: white;
  border-radius: 4px;
  padding: 1rem 1.5rem;
  /* padding-left: 1.25rem;
  margin-left: 0.25rem; */
}

.nav-link:hover::before {
  color: white;
  z-index: 2;
}

.language-selector {
  position: absolute;
  right: 1rem;
  display: flex;
  align-items: center;
}

.language-selector select {
  margin-left: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #42b983;
  border-radius: 4px;
  background-color: white;
  color: #42b983;
  font-size: 1rem;
  cursor: pointer;
}

.language-selector select:focus {
  outline: none;
  border-color: #2c8c6b;
}

.language-selector option {
  background-color: white;
  color: #42b983;
}

.content {
  margin-top: 2rem;
  padding-left: 1rem;
}
</style>
