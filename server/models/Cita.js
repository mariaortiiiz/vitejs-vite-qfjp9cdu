const mongoose = require("mongoose");

const CitaSchema = new mongoose.Schema({
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    idProfesional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipo",
        required: true
    },
    servicio: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        required: true
    },
    asunto:{
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: String,
        enum: ["Pendiente", "Confirmada", "Cancelada"],
        default: "Pendiente"
    }
});

module.exports = mongoose.model("Cita", CitaSchema);