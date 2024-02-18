import axios from "axios";
import store from "../store/store";

const axiosInstance = axios.create({baseURL : process.env.VUE_APP_API_URL});

axiosInstance.interceptors.request.use(
    config => {
        config.headers["Authorization"] = "bearer " + store.getters['user/token'];
        config.headers["Accept"] = "application/json";
        config.headers["Content-Type"] = "multipart/form-data";
        return config;
    }
)

axiosInstance.interceptors.response.use(
function (response){
    return {success : true, data : response.data};
}, 
function(error){
    store.commit("messages/display", {text : error.response.data.message, success : false});
    return {success : false};
}
);

export default axiosInstance;