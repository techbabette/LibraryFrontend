import parseJwt from "@/lib/parseJWT";

export default {
    state : {
        token : ""
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