<template>
  <div class="register">
    <h1>Registro</h1>

    <form class="form" @submit.prevent="handleRegister">
      <input v-model="nombre" placeholder="Nombre" />
      <input v-model="apellido" placeholder="Apellido" />
      <input v-model="edad" placeholder="Edad" />
      <input v-model="telefono" placeholder="Telefono" />
      <input v-model="correo" placeholder="Correo" />
      <input v-model="password" type="password" placeholder="Contraseña" />

      <button type="submit">Registrarse</button>
      <p v-if="errorVacio" style="color:red;">{{ errorVacio }}</p>
      <p v-if="errorEdad" style="color:red">{{ errorEdad }}</p>
      <p v-if="errorTelefono" style="color:red"> {{ errorTelefono }}</p>
      <p v-if="errorCorreo" style="color:red;">{{ errorCorreo }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nombre: "",
      apellido:"",
      edad: "",
      telefono: "",
      correo: "",
      password: "",
      errorEdad: "",
      errorTelefono: "",
      errorCorreo: "",
      errorVacio: ""
    };
  },
  methods: {
    async handleRegister() {
            let campos = this.camposVacios()
            let formato = this.formatoCorrecto()

            if(campos || !formato){
                return;
            }

            try {
                await axios.post("http://localhost:5000/api/autenticador/register", {
                nombre: this.nombre,
                apellido: this.apellido,
                edad: this.edad,
                telefono: this.telefono,
                correo: this.correo,
                password: this.password
            });

            alert("Usuario registrado correctamente");
        

            } catch (error) {
                if(error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Error de conexión con el servidor")
                }
            }
      
    },

    //Metodo que comprueba que el formato de telefono y correo sean correctos
    formatoCorrecto(){ 
        let formato = true;

        //Comprobar que el formato del correo es el correcto
        const regexCorreo = /^[A-Za-z0-9+_.-]+@(.+)$/;
        if(!regexCorreo.test(this.correo)){
            this.errorCorreo = "Formato de correo inválido"
            formato = false;
        } else {
            this.errorCorreo = "";
        }
        
        //Comprobar que el formato del telefono es correcto
        const regexTelfono = /^\d{10}$/;
        if(!regexTelfono.test(this.telefono)){
            this.errorTelefono = "Teléfono invalido"
            formato = false;
        } else {
            this.errorTelefono = "";
        }

        //Comprobar que el formato de la edad sea aceptable
        const regexEdad = /^(?:1[01][0-9]|120|[1-9]?[0-9])$/;
        if(!regexEdad.test(this.edad)){
            this.errorEdad = "Edad invalida"
            formato = false;
        } else {
            this.errorEdad = "";
        }
        return formato;
    },

    // Metodo que comprueba que no existan campos vacios y los marca
    camposVacios(){
        if(this.nombre === "" || this.apellido === "" || this.password === "" || this.edad === "" || this.correo === "" || this.telefono === ""){
            this.errorVacio = "Hay campos vacios"
            return true;
        } else {
            this.errorVacio = "";
            return false;
        }
    }


  }

};
</script>


<style scoped>
.register {
  max-width: 400px;
  margin: 60px auto;
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  transition: border 0.2s, box-shadow 0.2s;
}

input:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 5px rgba(66, 184, 131, 0.5);
}

button {
  padding: 12px;
  border: none;
  border-radius: 25px;
  background: linear-gradient(135deg, #42b883, #2c3e50);
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: #42b883;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .register {
    margin: 20px;
    padding: 20px;
  }
}
</style>