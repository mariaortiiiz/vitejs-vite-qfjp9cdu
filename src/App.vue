<template>
<div id="app">
  <header>
    <div class="logo" @click="vistaActual = 'home'">⚕️ FisioRed</div>
    <nav>
      <button @click="vistaActual = 'home'" :class="{ active: vistaActual === 'home' }">Inicio</button>
      <button @click="vistaActual = 'servicios'" :class="{ active: vistaActual === 'servicios' }">Servicios</button>
      <button @click="vistaActual = 'equipo'" :class="{ active: vistaActual === 'equipo' }">Equipo</button>
      <button
        v-if="isLogged"
        @click="vistaActual = 'cita'"
        :class="{ active: vistaActual === 'cita'}"> 
        Pedir cita
      </button>
      <button v-if="!isLogged" @click="vistaActual = 'register'" :class="{ active: vistaActual === 'register' }">Registrarse</button>
      <!-- <button v-if="!isLogged" @click="vistaActual = 'login'" :class="{ active: vistaActual === 'login'}">Iniciar sesión</button> -->      <button v-if="isLogged" @click="logout">Cerrar sesión</button>
    </nav>
  </header>

  <main>
    <HomeView v-if="vistaActual === 'home'" />
    <ServiciosView v-if="vistaActual === 'servicios'" />
    <EquipoView v-if="vistaActual === 'equipo'" />
    <RegisterView v-if="vistaActual === 'register'" />
    <LoginView v-if="vistaActual === 'login'" @login-success="handleLoginSuccess"/>
    <CitaView v-if="vistaActual === 'cita'" />
    
    <!-- Módulo Paciente con navegación interna -->
    <div v-if="vistaActual === 'paciente-dashboard'">
      <DashboardView v-if="subVistaPaciente === 'dashboard'" @cambiarVista="cambiarVistaPaciente" />
      <NuevaCitaView v-if="subVistaPaciente === 'nueva-cita'" @cambiarVista="cambiarVistaPaciente" />
    </div>
  </main>

  <footer>
    <div class="footer-content">
      <div class="footer-section">
        <h4>FisioRed</h4>
        <p>Tu clínica de fisioterapia de confianza</p>
      </div>
      <div class="footer-section">
        <h4>Contacto</h4>
        <p>📍 Calle Principal 123</p>
        <p>📞 123-456-789</p>
        <p>✉️ info@fisiored.com</p>
      </div>
      <div class="footer-section">
        <h4>Horario</h4>
        <p>Lunes a Viernes: 9:00 - 20:00</p>
        <p>Sábados: 10:00 - 14:00</p>
      </div>
    </div>
    <div class="copyright">
      <p>© 2024 FisioRed - Todos los derechos reservados</p>
    </div>
  </footer>
</div>
</template>

<script setup>
import { ref } from 'vue'
import HomeView from './views/HomeView.vue'
import ServiciosView from './views/ServiciosView.vue'
import EquipoView from './views/EquipoView.vue'
import RegisterView from './views/RegisterView.vue'
import LoginView from './views/LoginView.vue'
import CitaView from './views/CitaView.vue'
import DashboardView from './views/Paciente/DashboardView.vue'
import NuevaCitaView from './views/Paciente/NuevaCitaView.vue'

// Estados
const vistaActual = ref('home')
const isLogged = ref(!!localStorage.getItem("token"))
const subVistaPaciente = ref('dashboard')  // Para navegar dentro del módulo paciente

const logout= () => {
    localStorage.removeItem("token");
    isLogged.value = false;
    vistaActual.value = 'home';
    alert("Sesión cerrada");
    }

const handleLoginSuccess = (rol) => {
  isLogged.value = true;
  if (rol === 'admin') {
    vistaActual.value = 'admin-dashboard';
  } else {
    vistaActual.value = 'paciente-dashboard';
    subVistaPaciente.value = 'dashboard';
  }
}   

const cambiarVistaPaciente = (vista) => {
  subVistaPaciente.value = vista;
}   

</script>

<style>
* {
margin: 0;
padding: 0;
box-sizing: border-box;
}

body {
font-family: Arial, sans-serif;
line-height: 1.6;
color: #333;
}

#app {
min-height: 100vh;
display: flex;
flex-direction: column;
}

header {
background: #2c3e50;
color: white;
padding: 1rem 2rem;
display: flex;
justify-content: space-between;
align-items: center;
box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.logo {
font-size: 1.8rem;
font-weight: bold;
cursor: pointer;
}

nav button {
background: none;
border: none;
color: white;
margin-left: 15px;
padding: 8px 15px;
border-radius: 5px;
cursor: pointer;
font-size: 1rem;
transition: background 0.2s;
}

nav button:hover {
background: #42b883;
}

nav button.active {
background: #42b883;
}

main {
flex: 1;
padding: 20px;
background: #f9f9f9;
}

footer {
background: #2c3e50;
color: white;
margin-top: 40px;
}

.footer-content {
max-width: 1200px;
margin: 0 auto;
padding: 40px 20px;
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 30px;
}

.footer-section h4 {
color: #42b883;
margin-bottom: 15px;
}

.copyright {
text-align: center;
padding: 20px;
border-top: 1px solid rgba(255,255,255,0.1);
}

@media (max-width: 768px) {
header {
  flex-direction: column;
}

.logo {
  margin-bottom: 10px;
}

.footer-content {
  grid-template-columns: 1fr;
  text-align: center;
}
}
</style>