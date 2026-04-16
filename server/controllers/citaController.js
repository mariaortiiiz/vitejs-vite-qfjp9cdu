const Cita = require("../models/Cita");

const getCitas = async (req, res) => {

    try{
        const citas = await Cita.find();
        res.json(citas);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createCita = async (req, res) => {
    try{
        //Comprobar si existe
        const citaExiste = await Cita.findOne({
            idProfesional: req.body.idProfesional,
            fecha: new Date(req.body.fecha)
        });
        
        if(citaExiste){
            return res.status(400).json({
                message: "Horario ocupado"
            });
        }

        const nuevaCita = new Cita({
            ...req.body, 
            paciente: req.user.id});
            
        await nuevaCita.save();
        res.json(nuevaCita);

    } catch (error) {
        res.status(500).json({message: "Error al crear la cita"});
    }
};

module.exports = {getCitas, createCita};