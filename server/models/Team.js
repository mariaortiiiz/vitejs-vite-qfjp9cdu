const mongoose = require("mongoose");

const EquipoSchema = new mongoose.Schema({
    name: String,
    apellido: String,
    especialidad: [String],
    sueldo: Number,
    correo: String,
    telefono: String,
    NSS: String

});

module.exports = mongoose.model("Equipo", EquipoSchema);