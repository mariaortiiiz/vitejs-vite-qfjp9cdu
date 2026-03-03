<!-- src/views/ServiciosView.vue -->
<template>
<div class="servicios">
  <h1>Nuestros Servicios</h1>
  <p class="subtitulo">Ofrecemos tratamientos personalizados para cada paciente</p>
  
  <div class="grid">
    <div v-for="service in services" :key="service.id" class="card">
      <div class="icon">{{ service.icon }}</div>
      <h3>{{ service.name }}</h3>
      <p class="description">{{ service.description }}</p>
      <div class="details">
        <span class="price">{{ service.price }}€</span>
        <span class="duration">{{ service.duration }}</span>
      </div>
      <button class="btn-info" @click="seleccionarServicio(service)">Más información</button>
    </div>
  </div>

  <!-- Modal simple para información (opcional) -->
  <div v-if="servicioSeleccionado" class="modal" @click="cerrarModal">
    <div class="modal-content" @click.stop>
      <h2>{{ servicioSeleccionado.name }}</h2>
      <p>{{ servicioSeleccionado.description }}</p>
      <p><strong>Duración:</strong> {{ servicioSeleccionado.duration }}</p>
      <p><strong>Precio:</strong> {{ servicioSeleccionado.price }}€ por sesión</p>
      <button class="btn-cerrar" @click="cerrarModal">Cerrar</button>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { services } from '../data/services'

const servicioSeleccionado = ref(null)

const seleccionarServicio = (service) => {
servicioSeleccionado.value = service
}

const cerrarModal = () => {
servicioSeleccionado.value = null
}
</script>

<style scoped>
.servicios {
max-width: 1200px;
margin: 0 auto;
padding: 20px;
}

h1 {
text-align: center;
color: #2c3e50;
font-size: 2.5rem;
margin-bottom: 10px;
}

.subtitulo {
text-align: center;
color: #666;
margin-bottom: 40px;
font-size: 1.2rem;
}

.grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: 25px;
margin-top: 30px;
}

.card {
border: 1px solid #e0e0e0;
border-radius: 15px;
padding: 25px;
background: white;
box-shadow: 0 4px 12px rgba(0,0,0,0.1);
transition: all 0.3s;
display: flex;
flex-direction: column;
}

.card:hover {
transform: translateY(-5px);
box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.icon {
font-size: 3.5rem;
text-align: center;
margin-bottom: 15px;
}

h3 {
margin: 10px 0;
color: #2c3e50;
font-size: 1.3rem;
text-align: center;
}

.description {
color: #666;
margin-bottom: 20px;
flex-grow: 1;
line-height: 1.5;
}

.details {
display: flex;
justify-content: space-around;
margin: 15px 0;
padding: 10px 0;
border-top: 1px solid #eee;
border-bottom: 1px solid #eee;
}

.price {
font-weight: bold;
color: #42b883;
font-size: 1.3rem;
}

.duration {
color: #2c3e50;
font-size: 1rem;
}

.btn-info {
background: #42b883;
color: white;
border: none;
padding: 10px 20px;
border-radius: 5px;
cursor: pointer;
font-size: 1rem;
transition: background 0.2s;
margin-top: 10px;
}

.btn-info:hover {
background: #2c3e50;
}

/* Modal styles */
.modal {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0,0,0,0.5);
display: flex;
justify-content: center;
align-items: center;
z-index: 1000;
}

.modal-content {
background: white;
padding: 30px;
border-radius: 15px;
max-width: 500px;
width: 90%;
}

.modal-content h2 {
color: #2c3e50;
margin-bottom: 15px;
}

.modal-content p {
margin-bottom: 10px;
line-height: 1.6;
}

.btn-cerrar {
background: #2c3e50;
color: white;
border: none;
padding: 10px 20px;
border-radius: 5px;
cursor: pointer;
margin-top: 20px;
width: 100%;
}

.btn-cerrar:hover {
background: #42b883;
}
</style>