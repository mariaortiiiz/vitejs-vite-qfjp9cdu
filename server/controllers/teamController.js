const Equipo = require("../models/Team");

const getEquipo = async (req, res) => {

    try{
        const equipos = await Equipo.find();
        res.json(equipos);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createEquipo = async (req, res) => {
    try{
        const equipo = new Equipo(req.body);
        const saved = await equipo.save();
        res.json(saved);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = { getEquipo, createEquipo};