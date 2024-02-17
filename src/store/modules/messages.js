export default {
    state: {
        messages : []
    },
    mutations : {
        addMessageToList(state, newMessage){
            state.messages.push(newMessage);
        },
    },
    getters:{
        getAllMessages(state){
            return state.messages;
        }
    }
}