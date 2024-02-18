import Vue from 'vue'
import Vuex from 'vuex'
import axios from "@/axios/axios";

import navigation from "./modules/navigation"
import user from './modules/user';
import books from './modules/books'
import userbooks from './modules/userbooks'
import messages from './modules/messages'

Vue.use(Vuex);

export default new Vuex.Store({
    modules : {
        navigation,
        user,
        books,
        userbooks,
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