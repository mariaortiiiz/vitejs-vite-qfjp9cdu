const express = require("express");
const router = express.Router();

const { register } = require("../controllers/autenticadorController");

router.post("/register", register);
module.exports = router;
