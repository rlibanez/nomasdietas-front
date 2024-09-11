import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IngredientsView from '../views/IngredientsView.vue'
import DishesView from '../views/DishesView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ingredients',
      name: 'ingredients',
      component: IngredientsView
    },
    {
      path: '/ingredients/:id',
      name: 'ingredientsid',
      component: IngredientsView
    },
    {
      path: '/dishes',
      name: 'Dishes',
      component: DishesView
    },
    {
      path: '/dishes/:id',
      name: 'DishDetails',
      component: DishesView
    },
    {
      path: '/dishes/byingredient/:id',
      name: 'DishesByIngredient',
      component: DishesView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router
