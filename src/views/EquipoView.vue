<!-- src/views/EquipoView.vue -->
<template>
<div class="equipo">
  <h1>Nuestro Equipo Profesional</h1>
  <p class="subtitulo">Profesionales con vocación y experiencia</p>
  
  <div class="grid">
    <div v-for="member in team" :key="member.id" class="card">
      <div class="image-container">
        <img :src="member.image" :alt="member.name" class="photo">
      </div>
      <h3>{{ member.name }}</h3>
      <p class="specialty">{{ member.specialty }}</p>
      <p class="bio">{{ member.bio }}</p>
    </div>
  </div>
</div>
</template>

<script setup>
import { team } from '../data/team'
</script>

<style scoped>
.equipo {
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
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 30px;
margin-top: 30px;
}

.card {
border: 1px solid #e0e0e0;
border-radius: 15px;
padding: 25px;
background: white;
box-shadow: 0 4px 12px rgba(0,0,0,0.1);
transition: transform 0.3s;
text-align: center;
}

.card:hover {
transform: translateY(-5px);
box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.image-container {
width: 150px;
height: 150px;
margin: 0 auto 20px;
border-radius: 50%;
overflow: hidden;
border: 3px solid #42b883;
}

.photo {
width: 100%;
height: 100%;
object-fit: cover;
}

h3 {
color: #2c3e50;
margin-bottom: 5px;
font-size: 1.3rem;
}

.specialty {
color: #42b883;
font-weight: bold;
margin-bottom: 15px;
font-size: 1.1rem;
}

.bio {
color: #666;
line-height: 1.6;
text-align: left;
}

@media (max-width: 768px) {
.grid {
  grid-template-columns: 1fr;
}
}
</style>