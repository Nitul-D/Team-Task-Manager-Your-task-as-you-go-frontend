import axios from "axios"

export const axiosConnection = axios.create({
    baseURL: "http://localhost:5000/api",
});