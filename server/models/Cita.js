const mongoose = require("mongoose");

const CitaSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    edad: String,
    telefono: String,
    correo: String
});

module.exports = mongoose.model("Cita", CitaSchema);