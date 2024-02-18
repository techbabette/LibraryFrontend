export default {
    namespaced: true,
    state: {
        messages : []
    },
    mutations : {
        display(state, newMessage){
            state.messages.push(newMessage);
        },
    }
}