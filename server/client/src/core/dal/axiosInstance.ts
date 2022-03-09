import axios from "axios";

export const axiosInstance = axios.create({baseURL: 'http://localhost:5647/api'})