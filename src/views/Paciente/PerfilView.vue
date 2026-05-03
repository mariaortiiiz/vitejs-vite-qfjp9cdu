<template>
  <div class="perfil">
    <h1>Mi Perfil</h1>
    
    <div class="perfil-card">
      <div class="avatar">
        👤
      </div>
      
      <form @submit.prevent="guardarCambios" class="form">
        <div class="form-group">
          <label>Nombre completo</label>
          <input type="text" v-model="perfil.nombre" required>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="perfil.email" required>
        </div>

        <div class="form-group">
          <label>Teléfono</label>
          <input type="tel" v-model="perfil.telefono">
        </div>

        <div class="form-group">
          <label>Dirección</label>
          <textarea v-model="perfil.direccion" rows="2"></textarea>
        </div>

        <div class="form-group">
          <label>Fecha de nacimiento</label>
          <input type="date" v-model="perfil.fecha_nacimiento">
        </div>

        <button type="submit" class="btn-guardar">Guardar cambios</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      perfil: {
        nombre: '',
        email: '',
        telefono: '',
        direccion: '',
        fecha_nacimiento: ''
      }
    }
  },
  mounted() {
    this.cargarPerfil()
  },
  methods: {
    getAuthHeaders() {
      return {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }
    },
    async cargarPerfil() {
      // TODO: Conectar con API real
      /*
      try {
        const res = await axios.get('http://localhost:5000/api/paciente/perfil', this.getAuthHeaders())
        this.perfil = res.data
      } catch(error) {
        alert('Error al cargar el perfil')
      }
      */
      
      // Datos de ejemplo
      this.perfil = {
        nombre: 'María García López',
        email: 'maria@example.com',
        telefono: '612345678',
        direccion: 'Calle Mayor 123, Madrid',
        fecha_nacimiento: '1990-05-15'
      }
    },
    async guardarCambios() {
      // TODO: Conectar con API real
      /*
      try {
        await axios.put('http://localhost:5000/api/paciente/perfil', this.perfil, this.getAuthHeaders())
        alert('Perfil actualizado correctamente')
      } catch(error) {
        alert('Error al guardar los cambios')
      }
      */
      
      alert('Perfil actualizado (modo demostración)')
    }
  }
}
</script>

<style scoped>
.perfil {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
}
.perfil-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.avatar {
  text-align: center;
  font-size: 80px;
  margin-bottom: 20px;
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
input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}
.btn-guardar {
  background: #42b883;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 25px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
}
</style>