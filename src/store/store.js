import Vue from 'vue'
import Vuex from 'vuex'
import axios from "@/axios/axios";

import navigation from "./modules/navigation"
import users from './modules/users';
import books from './modules/books'
import yourbooks from './modules/yourbooks'
import messages from './modules/messages'

Vue.use(Vuex);

export default new Vuex.Store({
    modules : {
        navigation,
        users,
        books,
        yourbooks,
        messages
    },
    actions : {
        async fetch(context, options){
            let {url, params} = options;

            let result = await axios.get(url, {params});

            return result;
        }
    }
})