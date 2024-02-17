import axios from "@/axios/axios";
import parseJwt from "@/lib/parseJWT";
import { setTimeout } from "core-js";

export default {
    state : {
        token : ""
    },
    actions : {
        async attemptLogin(context, credentials){
            let response = (await axios.post("/auth/login", credentials))
            let token = response.data.body;

            context.commit("changeToken", token);
        }
    },
    mutations : {
        changeToken(state, newToken){
            state.token = newToken;

            let {exp} = parseJwt(newToken);
            let timeTillExpiration = exp * 1000 - Date.now();

            setTimeout(function(){
                state.token = ""
            }, timeTillExpiration);
        }
    },
    getters : {
        token(state){
            return state.token;
        },
        claims(state, getters){
            let JWTClaims = parseJwt(getters.token);

            return JWTClaims;
        },
        activeUserRole(state){
            return state.userRole;
        }
    }
}