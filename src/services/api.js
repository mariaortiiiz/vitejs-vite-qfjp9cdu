import axios from "axios";

const API = axios.create({

    baseURL: "http://localhost:5000/api"
});

export const getServices = () => API.get("/services");
export const getTeam = () => API.get("/team");