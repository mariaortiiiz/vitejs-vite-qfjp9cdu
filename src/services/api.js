import axios from "axios";

const API = axios.create({

    baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;

export const getServices = () => API.get("/services");
export const getEquipo = () => API.get("/team");
export const getCita = () => API.get("/citas");
export const getUsuarios = () => API.get("/usuarios");