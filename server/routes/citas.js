const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const{
    getCitas,
    createCita,
    getHorasOcupadas
} = require("../controllers/citaController");

router.get("/disponibles", authMiddleware, getHorasOcupadas);
router.get("/", authMiddleware, getCitas);
router.post("/", authMiddleware, createCita);


module.exports = router;