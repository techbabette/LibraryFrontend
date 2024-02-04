export default {
    state : {
        token : "",
        userRole : "standard"
    },
    getters : {
        activeUserRole(state){
            return state.userRole;
        }
    }
}