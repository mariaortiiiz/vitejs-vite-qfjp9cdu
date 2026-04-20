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

const getHorasOcupadas = async (req, res) => {
    try{
        const {profesional, fecha} = req.query;

        const inicio = new Date(fecha);
        const fin = new Date(fecha);
        fin.setHours(23, 59, 59);

        const citas = await Cita.find({
            idProfesional: profesional,
            fecha: {
                $gte: inicio,
                $lte: fin
            }
        });

        const horasOcupadas = citas.map(cita => 
            new Date(cita.fecha).toISOString().substring(11, 16)
        );

        res.json(horasOcupadas);
    } catch (error) {
        res.status(500).json({ message: "Error obteniendo horas ocupadas" });
    }
};

module.exports = {getCitas, createCita, getHorasOcupadas};