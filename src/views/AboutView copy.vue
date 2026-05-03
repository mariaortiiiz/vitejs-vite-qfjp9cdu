<!-- src/views/ServiciosView.vue -->
<template>
<div class="servicios">
  <h1>Nuestros Servicios</h1>
  <div class="grid">
    <div v-for="service in services" :key="service.id" class="card">
      <div class="icon">{{ service.icon }}</div>
      <h3>{{ service.name }}</h3>
      <p>{{ service.description }}</p>
      <p class="price">{{ service.price }}€ / sesión</p>
    </div>
  </div>
</div>
</template>

<script setup>
import { services } from '../data/services'
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
}
.grid {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
gap: 20px;
margin-top: 30px;
}
.card {
border: 1px solid #e0e0e0;
border-radius: 10px;
padding: 20px;
background: white;
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
transition: transform 0.2s;
}
.card:hover {
transform: translateY(-5px);
box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.icon {
font-size: 3rem;
text-align: center;
margin-bottom: 10px;
}
h3 {
margin: 10px 0;
color: #2c3e50;
}
.price {
font-weight: bold;
color: #42b883;
font-size: 1.2rem;
margin-top: 10px;
}
</style>