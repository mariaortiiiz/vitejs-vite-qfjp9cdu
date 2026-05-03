// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

function isAuthenticated() {
  return localStorage.getItem('token') !== null
}

function getRol() {
  return localStorage.getItem('rol')
}

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
    },
    {
      path: "/login",
      name: "login",
      component: () => import('../views/LoginView.vue')
    },
    // === 🆕 RUTAS DEL MÓDULO PACIENTE (AÑADE ESTAS) ===
    {
      path: "/paciente/dashboard",
      name: "paciente-dashboard",
      component: () => import('../views/paciente/DashboardView.vue'),
      meta: { requiresAuth: true, role: 'paciente' }   // ← protección
    },
    {
      path: "/paciente/nueva-cita",
      name: "paciente-nueva-cita",
      component: () => import('../views/paciente/NuevaCitaView.vue'),
      meta: { requiresAuth: true, role: 'paciente' }
    },
    {
      path: "/paciente/perfil",
      name: "paciente-perfil",
      component: () => import('../views/paciente/PerfilView.vue'),
      meta: { requiresAuth: true, role: 'paciente' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const necesitaAuth = to.meta.requiresAuth
  const autenticado = isAuthenticated()
  const rolUsuario = getRol()
  const rolRequerido = to.meta.role

  if (necesitaAuth && !autenticado) {
    // No ha iniciado sesión → lo mandamos al login
    next('/login')
  } else if (necesitaAuth && rolRequerido && rolUsuario !== rolRequerido) {
    // Está logueado pero no tiene el rol correcto
    alert('No tienes acceso a esta sección')
    next('/')
  } else {
    next()
  }
})

export default router