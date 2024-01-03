import Vue from 'vue'
import Vuex from 'vuex'
import navigation from "./modules/navigation"
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
    modules : {
        navigation,
        users
    }
})