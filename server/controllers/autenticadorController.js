const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

const register = async(req, res) => {

    try{
        const {nombre, apellido, edad, telefono, correo, password } = req.body;
        const existeCorreo = await Usuario.findOne({ correo });

        if(existeCorreo){
            return res.status(400).json({ message: "Correo ya existente" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const usuario = new Usuario({ 
            nombre, apellido, edad, telefono, correo, 
            password: hashPassword 
        });
        const saveUsuario = await usuario.save();
        res.json(saveUsuario);

    } catch (error){
        res.status(500).json({ message: error.message });
    }
};

module.exports = {register};