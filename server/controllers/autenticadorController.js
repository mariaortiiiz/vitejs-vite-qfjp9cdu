const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const login = async (req, res) => {

    try{
        const { correo, password } = req.body;

        // Buscamos al usuario
        const usuario = await Usuario.findOne({ correo });
        if(!usuario){
            return res.status(400).json({ message: "Usuario no registrado" });
        }

        // Si encontramos el usuario comparamos la constraseña
        const isMatch = await bcrypt.compare(password, usuario.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta "});
        }

        // Crear token
        const token = jwt.sign(
            { id: usuario._id, correo: usuario.correo}, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h"}
        );

        res.json({
            message: "Se ha iniciado sesión",
            token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {register, login};