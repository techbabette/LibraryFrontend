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
            if(!response.success){
                return response;
            }

            let token = response.data.body;
            context.commit("addMessageToList", {text : "Successfully logged in", success : true})
            context.commit("changeToken", token);
            return response;
        }
    },
    mutations : {
        changeToken(state, newToken){
            state.token = newToken;

            let {exp} = parseJwt(newToken);
            let timeTillExpiration = exp * 1000 - Date.now();
            let that = this;

            setTimeout(function(){
                state.token = ""
                that.commit("addMessageToList", {text : "Session expired", success : false})
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