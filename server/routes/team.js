const express = require("express");
const router = express.Router();

const {
    getEquipo,
    createEquipo
} = require("../controllers/teamController");

router.get("/", getEquipo);
router.post("/", createEquipo);

module.exports = router;