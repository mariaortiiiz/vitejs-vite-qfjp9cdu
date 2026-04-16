<!-- src/views/HomeView.vue -->
<template>
<div class="inicio">
  <div class="hero">
    <h1>⚕️ FisioRed</h1>
    <p class="slogan">Tu recuperación es nuestra prioridad</p>
    <p class="descripcion">Clínica de fisioterapia con los mejores profesionales</p>
    <button class="btn" @click="$parent.vistaActual = 'servicios'">
      Ver servicios
    </button>
  </div>
  
  <div class="features">
    <div class="feature">
      <div class="feature-icon">🌟</div>
      <h3>Profesionales cualificados</h3>
      <p>Especialistas con años de experiencia y formación continua</p>
    </div>
    <div class="feature">
      <div class="feature-icon">📍</div>
      <h3>Ubicación céntrica</h3>
      <p>Fácil acceso en metro, autobús y con aparcamiento cercano</p>
    </div>
    <div class="feature">
      <div class="feature-icon">💚</div>
      <h3>Trato personalizado</h3>
      <p>Te acompañamos en cada paso de tu recuperación</p>
    </div>
  </div>

  <div class="cta">
    <h2>¿Listo para empezar tu recuperación?</h2>
    <p>Contacta con nosotros y te evaluaremos sin compromiso</p>
    <button class="btn btn-secondary" @click="$parent.vistaActual = 'equipo'">
      Conoce a nuestro equipo
    </button>
  </div>
</div>
</template>

<style scoped>
.inicio {
text-align: center;
}

.hero {
background: linear-gradient(135deg, #42b883, #2c3e50);
color: white;
padding: 80px 20px;
margin-bottom: 40px;
border-radius: 0 0 20px 20px;
}

.hero h1 {
font-size: 3.5rem;
margin-bottom: 20px;
text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.slogan {
font-size: 1.5rem;
margin-bottom: 10px;
opacity: 0.95;
}

.descripcion {
font-size: 1.2rem;
margin-bottom: 30px;
opacity: 0.9;
}

.btn {
display: inline-block;
padding: 12px 30px;
background: white;
color: #2c3e50;
text-decoration: none;
border-radius: 25px;
font-weight: bold;
transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
transform: scale(1.05);
box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.btn-secondary {
background: #2c3e50;
color: white;
}

.features {
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 30px;
max-width: 1000px;
margin: 0 auto 60px;
padding: 20px;
}

.feature {
padding: 30px 20px;
background: white;
border-radius: 10px;
box-shadow: 0 5px 15px rgba(0,0,0,0.1);
transition: transform 0.2s;
}

.feature:hover {
transform: translateY(-5px);
}

.feature-icon {
font-size: 3rem;
margin-bottom: 15px;
}

.feature h3 {
color: #2c3e50;
margin-bottom: 10px;
}

.cta {
background: #f5f5f5;
padding: 60px 20px;
border-radius: 20px;
max-width: 800px;
margin: 0 auto;
}

.cta h2 {
color: #2c3e50;
margin-bottom: 15px;
}

.cta p {
margin-bottom: 25px;
color: #666;
}

@media (max-width: 768px) {
.features {
  grid-template-columns: 1fr;
}

.hero h1 {
  font-size: 2.5rem;
}
}
</style>