import axios from "axios";

const API = axios.create({

    baseURL: "http://localhost:5000/api"
});

export const getServices = () => API.get("/services");
export const getEquipo = () => API.get("/team");
export const getCita = () => API.get("/citas");
export const getUsuarios = () => API.get("/usuarios");