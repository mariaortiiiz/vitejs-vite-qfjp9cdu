const express = require("express");
const router = express.Router();

const{
    getCitas,
    createCita
} = require("../controllers/citaController");

router.get("/", getCitas);
router.post("/", createCita);

module.exports = router;