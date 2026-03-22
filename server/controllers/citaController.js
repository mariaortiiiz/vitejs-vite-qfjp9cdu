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
        const cita = new Cita(req.body);
        const saved = await cita.save();
        res.json(saved);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {getCitas, createCita};