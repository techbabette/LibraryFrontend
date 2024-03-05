import axios from "@/axios/axios";
import parseJwt from "@/lib/parseJWT";
import router from '../../router/router';
import { setTimeout } from "core-js";

export default {
    namespaced : true,
    state : {
        token : "",
    },
    actions : {
        async attemptLogin(context, credentials){
            let response = (await axios.post("/auth/login", credentials))
            if(!response.success){
                return response;
            }

            let token = response.data.body;
            router.push("/").catch(()=>{});
            context.commit("messages/display", {text : "Successfully logged in", success : true}, {root : true});
            context.commit("changeToken", token);
            return response;
        },
        async attemptLogout(context){
            let response = (await axios.get("/auth/logout"))
            if(!response.success){
                return response;
            }

            router.push("/").catch(()=>{});
            context.commit("messages/display", {text : "Successfully logged out", success : true}, {root : true});
            context.commit("changeToken", "");
            return response;
        }
    },
    mutations : {
        changeToken(state, newToken){
            state.token = newToken;
            if(!newToken) return;

            let {exp} = parseJwt(newToken);
            let timeTillExpiration = exp * 1000 - Date.now();
            let that = this;

            setTimeout(function(){
                let expired = (parseJwt(state.token).exp ?? 0) < 1000 - Date.now();
                if(expired){
                    state.token = ""
                    that.commit("messages/display", {text : "Session expired", success : false}, {root : true});
                    router.push("/").catch(()=>{});
                }
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
        accessLevel(state, getters){
            return getters.claims.access_level ?? -1;
        }
    }
}