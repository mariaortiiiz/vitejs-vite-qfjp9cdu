const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    correo: { type: String, unique: true },
    name: String,
    apellido: String,
    edad: Number,
    telefono: String,
    password: String
});

module.exports = mongoose.model("Usuario", UsuarioSchema);