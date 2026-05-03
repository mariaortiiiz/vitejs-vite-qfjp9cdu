<template>
  <div class="nueva-cita">
    <h1>Solicitar nueva cita</h1>
    
    <form @submit.prevent="enviarSolicitud" class="form">
      <div class="form-group">
        <label>Fecha preferente</label>
        <input type="date" v-model="cita.fecha" required :min="fechaMinima">
      </div>

      <div class="form-group">
        <label>Hora preferente</label>
        <select v-model="cita.hora" required>
          <option value="">Selecciona una hora</option>
          <option v-for="h in horasDisponibles" :key="h" :value="h">{{ h }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>Profesional</label>
        <select v-model="cita.profesional_id" required>
          <option value="">Selecciona un profesional</option>
          <option value="1">Beatriz Andrés</option>
          <option value="2">María Ortiz de Pinedo</option>
          <option value="3">Asier Rodríguez</option>
        </select>
      </div>

      <div class="form-group">
        <label>Motivo de la consulta</label>
        <textarea v-model="cita.motivo" rows="3" placeholder="Describe brevemente tu motivo..."></textarea>
      </div>

      <div class="button-group">
        <button type="button" @click="volver" class="btn-cancelar">Cancelar</button>
        <button type="submit" class="btn-enviar">Enviar solicitud</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      cita: {
        fecha: '',
        hora: '',
        profesional_id: '',
        motivo: ''
      },
      horasDisponibles: ['09:00', '10:00', '11:00', '12:00', '16:00', '17:00', '18:00']
    }
  },
  computed: {
    fechaMinima() {
      const hoy = new Date()
      return hoy.toISOString().split('T')[0]
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    },
    async enviarSolicitud() {
      // TODO: Cuando el backend esté listo, descomentar:
      /*
      try {
        await axios.post('http://localhost:5000/api/citas', this.cita, this.getAuthHeaders())
        alert('Solicitud enviada. Un administrador la confirmará pronto.')
        this.$emit('cambiarVista', 'dashboard')
      } catch(error) {
        alert('Error al enviar la solicitud')
      }
      */
      
      // Versión de ejemplo
      alert('Solicitud enviada (modo demostración)')
      this.$router.push('/paciente/dashboard')
    },
    volver() {
      this.$emit('cambiarVista', 'dashboard')
    },
  }
}
</script>

<style scoped>
.nueva-cita {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #2c3e50;
}
input, select, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}
.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.btn-enviar {
  background: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  flex: 1;
}
.btn-cancelar {
  background: #95a5a6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  flex: 1;
}
</style>
