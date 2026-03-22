// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/servicios',
      name: 'servicios',
      component: () => import('../views/ServiciosView.vue')
    },
    {
      path: '/equipo',
      name: 'equipo',
      component: () => import('../views/EquipoView.vue')
    },
    {
      path: "/register",
      name: "register",
      component: () => import('../views/RegisterView.vue')
    }
  ]
})

export default router