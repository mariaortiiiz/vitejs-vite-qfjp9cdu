const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/services", require("./routes/services"));
//app.use("/api/team", require("./routes/team"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

