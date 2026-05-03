<template>
  <div class="dashboard">
    <h1>Panel del Paciente</h1>
    
    <div class="welcome-card">
      <h2>¡Bienvenido a tu área personal!</h2>
      <p>Aquí puedes gestionar tus citas y ver tu historial</p>
    </div>

    <div class="cards-container">
      <!-- Tarjeta de próximas citas -->
      <div class="card">
        <h3>📅 Próximas citas</h3>
        <div v-if="cargandoCitas">Cargando...</div>
        <div v-else-if="citasProximas.length === 0" class="empty">
          No tienes citas programadas
        </div>
        <div v-else>
          <div v-for="cita in citasProximas" :key="cita.id" class="cita-item">
            <p><strong>{{ formatFecha(cita.fecha) }}</strong> - {{ cita.hora }}</p>
            <p>👨‍⚕️ {{ cita.profesional }}</p>
            <button @click="cancelarCita(cita.id)" class="btn-cancelar">Cancelar</button>
          </div>
        </div>
        <button @click="irANuevaCita" class="btn-nueva-cita">
          + Solicitar nueva cita
        </button>
        <button @click="irAPerfil" class="btn-perfil">
          👤 Mi Perfil
        </button>

      </div>

      <!-- Tarjeta de historial -->
      <div class="card">
        <h3>📋 Historial de sesiones</h3>
        <div v-if="cargandoHistorial">Cargando...</div>
        <div v-else-if="historial.length === 0" class="empty">
          No hay sesiones anteriores
        </div>
        <div v-else>
          <div v-for="sesion in historial" :key="sesion.id" class="sesion-item">
            <p><strong>{{ formatFecha(sesion.fecha) }}</strong></p>
            <p class="notas">{{ sesion.notas }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      citasProximas: [],
      historial: [],
      cargandoCitas: true,
      cargandoHistorial: true
    }
  },
  mounted() {
    this.cargarDatos()
  },
  methods: {
    cargarDatos() {
      // Datos de ejemplo
      setTimeout(() => {
        this.citasProximas = [
          { id: 1, fecha: '2025-05-15', hora: '10:00', profesional: 'Beatriz Andrés' },
          { id: 2, fecha: '2025-05-22', hora: '11:30', profesional: 'Asier Rodríguez' }
        ]
        this.historial = [
          { id: 1, fecha: '2025-05-01', notas: 'Ejercicios de estiramiento y fortalecimiento' },
          { id: 2, fecha: '2025-04-20', notas: 'Mejora en la movilidad del hombro' }
        ]
        this.cargandoCitas = false
        this.cargandoHistorial = false
      }, 500)
    },
    formatFecha(fecha) {
      return new Date(fecha).toLocaleDateString('es-ES')
    },
    cancelarCita(id) {
      if(confirm('¿Estás seguro de cancelar esta cita?')) {
        this.citasProximas = this.citasProximas.filter(c => c.id !== id)
        alert('Cita cancelada')
      }
    },
    irANuevaCita() {
      // Cambiar la vista a nueva-cita
      this.$emit('cambiarVista', 'nueva-cita')
    }
    irAPerfil() {
        this.$emit('cambiarVista', 'perfil')
    }
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.welcome-card {
  background: linear-gradient(135deg, #42b883, #2c3e50);
  color: white;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 30px;
  text-align: center;
}
.cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}
.card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.card h3 {
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 2px solid #42b883;
  padding-bottom: 10px;
}
.cita-item, .sesion-item {
  border: 1px solid #eee;
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
}
.btn-cancelar {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}
.btn-nueva-cita {
  background: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  width: 100%;
  margin-top: 15px;
}
.btn-perfil {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}
.empty {
  text-align: center;
  color: #999;
  padding: 20px;
}
.notas {
  color: #666;
  font-size: 0.9em;
}
@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: 1fr;
  }
}
</style>