const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const{
    getCitas,
    createCita
} = require("../controllers/citaController");

router.get("/", authMiddleware, getCitas);
router.post("/", authMiddleware, createCita);

module.exports = router;

/* 
router.get("/", authMiddleware, getCitas);
router.post("/", authMiddleware, createCita);
*/