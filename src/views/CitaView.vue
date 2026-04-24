<template>
  <div class="cita">
    <h1>Pedir cita</h1>

    <form class="form" @submit.prevent="handleCita">
        <select v-model="idProfesional">
            <option disabled value="">Selecciona un profesional</option>
            
            <option 
                v-for="pro in profesionales" 
                :key="pro._id" 
                :value="pro._id"
            >
                {{ pro.name }} {{ pro.apellido }}
            </option>

        </select>
      
        <input v-model="servicio" placeholder="Servicio" />

        <VueDatePicker v-model="fecha" :enable-time-picker="false" 
          :min-date="new Date()" 
          :disabled-dates="deshabilitarDomingos"
          :format="formatearFecha"
          teleport="body"
          />

            <select v-model="horaSeleccionada">
                <option disabled value="">Selecciona hora</option>
                <option v-for="hora in horas" :key="hora" :value="hora" :disabled="horasOcupadas.includes(hora)">
                    {{ hora }}
                    {{ horasOcupadas.includes(hora) ? '(ocupada)' : '' }}
                </option>
            </select>

      <input v-model="asunto" placeholder="Motivo de la cita" />

      <button type="submit">Reservar cita</button>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
  </div>
</template>

<script>
import API from "../services/api";
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  components:{
    VueDatePicker
  },
  data() {
    return {
      profesionales: [],
      horas: [],
      horaSeleccionada: "",
      idProfesional: "",
      servicio: "",
      fecha: null,
      asunto: "",
      error: "",
      success: "",
      hoy: new Date().toISOString().split("T")[0],
      horasOcupadas: []
    };
  },
   async mounted() {
    try {
      const res = await API.get("/team");
      this.profesionales = res.data;
    } catch (error) {
      console.error("Error cargando profesionales");
    }

    this.generarHoras();
  },
  watch: {
    fecha(nuevaFecha) {
      if(nuevaFecha){
        nuevaFecha.setHours(0,0,0,0);
      }
      this.cargarHorasOcupadas();
      this.generarHoras();
    },
    idProfesional(){
      this.cargarHorasOcupadas();
    }
  },
  methods: {

    generarHoras() {
      const horas = [];
      const ahora = new Date();

      if(!this.fecha){
        this.horas = [];
        return;
      }

      const dia = new Date(this.fecha).getDay();

      let inicio = 9;
      let fin = 20;

      if(dia === 6){
        inicio = 10;
        fin = 14;
      }

      for (let h = inicio; h < fin; h++) {
        ["00", "30"].forEach((min) => {
          const hora = `${h.toString().padStart(2, "0")}:${min}`;

          const fechaHora = new Date(this.fecha);
          fechaHora.setHours(h, min === "00" ? 0 : 30, 0, 0);
          
          const esHoy = fechaHora.toDateString() === ahora.toDateString();

          if ((!esHoy || fechaHora > ahora) && !this.horasOcupadas.includes(hora)) {
            horas.push(hora);
          }
        });
      }

      this.horas = horas;

    },

    async cargarHorasOcupadas() {
      if (!this.idProfesional || !this.fecha) return;

      try {
        const fechaFormateada = new Date (this.fecha).toLocaleDateString("en-CA", {
          timeZone: "Europe/Madrid"
        })
        const res = await API.get("/citas/disponibles", {
          params: {
            profesional: this.idProfesional,
            fecha: fechaFormateada
          }
        });

        this.horasOcupadas = res.data;

        this.generarHoras(); // recalcular horas disponibles
      } catch (error) {
        console.error("Error cargando horas ocupadas");
      }
    },

    deshabilitarDomingos(date){
      return date.getDay() === 0;
    },

    async handleCita() {
        this.error = "";
        this.success = "";

        const token = localStorage.getItem("token");

        if (!token) {
            this.error = "Debes iniciar sesión para pedir cita";
            return;
        }

        if (!this.fecha || !this.horaSeleccionada) {
            this.error = "Selecciona fecha y hora";
            return;
        }

        // Unir fecha + hora
        const fechaFormateada = new Date (this.fecha).toLocaleDateString("en-CA", {
          timeZone: "Europe/Madrid"
        });
        const fechaCompleta = `${fechaFormateada}T${this.horaSeleccionada}`;

        try {
            await API.post("/citas", {
                idProfesional: this.idProfesional,
                servicio: this.servicio,
                fecha: fechaCompleta,
                asunto: this.asunto
            });

            this.success = "Cita reservada correctamente";

        } catch (error) {
            this.error = error.response?.data?.message || "Error";
        }
    },
    formatearFecha(date){
      if(!date) return "";

      return date.toLocaleDateString("es-ES", {
        timeZone: "Europe/Madrid",
      });
    }
  }
};
</script>

<style scoped>
.cita {
  max-width: 420px;
  margin: 60px auto;
  padding: 35px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.2s ease;
}

.cita:hover {
  transform: translateY(-3px);
}

h1 {
  color: #2c3e50;
  margin-bottom: 25px;
  font-size: 1.8rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

input,
select {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
  background: #f9fafb;
  transition: all 0.2s ease;
}

select,
input {
  color: #2c3e50;
}

input:focus,
select:focus {
  outline: none;
  border-color: #42b883;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.15);
}

select {
  cursor: pointer;
}

button {
  margin-top: 10px;
  padding: 13px;
  border: none;
  border-radius: 30px;
  background: linear-gradient(135deg, #42b883, #2c3e50);
  color: white;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.25s ease;
}

button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

button:active {
  transform: scale(0.98);
}

.error {
  color: #e74c3c;
  font-size: 0.9rem;
}

.success {
  color: #2ecc71;
  font-size: 0.95rem;
}

/* Animación suave */
.form > * {
  animation: fadeIn 0.4s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


@media (max-width: 768px) {
  .cita {
    margin: 20px;
    padding: 25px;
  }
}

:deep(.dp__menu) {
  z-index: 9999 !important;
}

:deep(.dp__input_wrap) {
  position: relative;
  z-index: 9999;
}

</style>