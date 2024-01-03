export default {
    state : {
        token : "",
        userRole : "logged out"
    },
    getters : {
        activeUserRole(state){
            return state.userRole;
        }
    }
}