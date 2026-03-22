const Service = require("../models/Usuario");

const getUsuarios = async (req, res) => {

    try{
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createUsuario = async (req, res) => {
    try{
        const usuario = new Usuario(req.body);
        const saved = await usuario.save();
        res.json(saved);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = { getUsuarios, createUsuario};
