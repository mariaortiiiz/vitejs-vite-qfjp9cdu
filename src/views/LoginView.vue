<template>
  <div class="login">
    <h1>Iniciar sesión</h1>

    <form class="form" @submit.prevent="handleLogin">
      <input v-model="correo" placeholder="Correo" />
      <input v-model="password" type="password" placeholder="Contraseña" />

      <button type="submit">Iniciar sesión</button>
      <p v-if="error" style="color:red;">{{ error }}</p>
    </form>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      correo: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async handleLogin() {
            try {
                const res = await axios.post("http://localhost:5000/api/autenticador/login", {
                correo: this.correo,
                password: this.password
            });
            localStorage.setItem("token", res.data.token);
            alert("Se ha iniciado sesión");
            
            this.$emit("login-success");
            window.location.reload();

            } catch (error) {
                if(error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("Error de conexión")
                }
            }
        },
    },
};
</script>


<style scoped>
.login {
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
  .login {
    margin: 20px;
    padding: 20px;
  }
}
</style>