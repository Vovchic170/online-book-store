import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import BooksPage from '../views/BooksPage.vue'
import BasketPage from '../views/BasketPage.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/books', component: BooksPage },
  { path: '/basket', component: BasketPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router



// src/router/index.js



