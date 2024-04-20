import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_axiosBaseUrl
});

export default instance;
