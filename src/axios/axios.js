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
    if(response.data){
        return {success : true, data : response.data, message : response.data.message, body : response.data.body};
    }
}, 
function(error){
    let response = {success : false};
    if(error.response){
        response.errors = {};
        for(let key of Object.keys(error.response.data.errors)){
            response.errors[key] = error.response.data.errors[key][0];
        }
        store.commit("messages/display", {text : error.response.data.message ?? error.response.data.error, success : false});
    }
    return response;
}
);

export default axiosInstance;