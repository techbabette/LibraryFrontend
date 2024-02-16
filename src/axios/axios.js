import axios from "axios";
import store from "../store/store";

const axiosInstance = axios.create({baseURL : process.env.VUE_APP_API_URL});

axiosInstance.interceptors.request.use(
    config => {
        config.headers["bearer"] = store.getters.token;
        config.headers["Accept"] = "application/json";
        return config;
    }
)

export default axiosInstance;