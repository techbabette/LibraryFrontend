import axios from "@/axios/axios";
export default{
    namespaced: true,
    state : {
        currentlyActiveRoute : "Home page",
        links : []
    },
    actions : {
        async fetch(context){
            let links = (await axios.get('/link')).data;

            context.commit("changeLinks", links);
        }
    },
    mutations : {
        changeActiveRouteName(state, newRouteName){
            state.currentlyActiveRoute = newRouteName
        },
        changeLinks(state, newNavigationLinks){
            state.links = newNavigationLinks;
        }
    },
    getters : {
        links(state, getters, rootState, rootGetters){
            if((rootGetters['user/claims'].links)){
                return rootGetters['user/claims'].links;
            }

            return state.links;
        },
        activeRoute(state){
            return state.currentlyActiveRoute
        },
        headerLink(state, getters){
            return getters.links.filter(link => link.position === "header").sort((a,b) => b.weight - a.weight)[0];
        },
        userNavbar(state, getters){
            return getters.links.filter(link => link.position === "navbar").sort((a,b) => b.weight - a.weight);
        },
        userFooter(state, getters){
            return getters.links.filter(link => link.position === "footer").sort((a,b) => b.weight - a.weight);
        }
    }
}