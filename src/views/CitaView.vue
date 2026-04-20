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
      
        <input v-model="servicio" placeholder="Servicio (Ej: Fisioterapia)" />

        <input v-model="fecha" type="date" :min="hoy"/>

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

export default {
  data() {
    return {
      profesionales: [],
      horas: [],
      horaSeleccionada: "",
      idProfesional: "",
      servicio: "",
      fecha: "",
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
    fecha() {
      this.cargarHorasOcupadas();
    },
    idProfesional(){
      this.cargarHorasOcupadas();
    }
  },
  methods: {

    generarHoras() {
      const horas = [];
      const ahora = new Date();

      for (let h = 9; h < 20; h++) {
        ["00", "30"].forEach((min) => {
          const hora = `${h.toString().padStart(2, "0")}:${min}`;
          const fechaHora = new Date(`${this.fecha}T${hora}`);

          if ((!this.fecha || fechaHora > ahora) && !this.horasOcupadas.includes(hora)){
            horas.push(hora);
          }
        });
      }

      this.horas = horas;

    },

    async cargarHorasOcupadas() {
      if (!this.idProfesional || !this.fecha) return;

      try {
        const res = await API.get("/citas/disponibles", {
          params: {
            profesional: this.idProfesional,
            fecha: this.fecha
          }
        });

        this.horasOcupadas = res.data;

        this.generarHoras(); // recalcular horas disponibles
      } catch (error) {
        console.error("Error cargando horas ocupadas");
      }
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
        const fechaCompleta = `${this.fecha}T${this.horaSeleccionada}`;

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

</style>