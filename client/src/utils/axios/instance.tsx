import axios from "axios";

const instance = axios.create({
    baseURL: "https://eventplatform-tr.onrender.com/"
});

export default instance;
