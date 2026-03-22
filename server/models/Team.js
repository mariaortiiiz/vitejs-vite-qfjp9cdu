const mongoose = require("mongoose");

const EquipoSchema = new mongoose.Schema({
    _id: String,
    name: String,
    apellido: String,
    especialidad: [String],
    sueldo: Number,
    correo: String,
    telefono: String,
    NSS: Number,

});

module.exports = mongoose.model("Equipo", EquipoSchema);