import axios from "@/axios/axios";
export default{
    state : {
        currentlyActiveRoute : "Home page",
        navigationLinks : []
    },
    mutations : {
        changeActiveRouteName(state, newRouteName){
            state.currentlyActiveRoute = newRouteName
        },
        changeNavigationLinks(state, newNavigationLinks){
            state.navigationLinks = newNavigationLinks;
        }
    },
    actions : {
        async fetchNavigationLinks(context){
            let navigationLinks = (await axios.get('/link')).data;

            context.commit("changeNavigationLinks", navigationLinks);
        }
    },
    getters : {
        getNavigationLinks(state, getters, rootState, rootGetters){
            if(rootGetters.claims.links){
                console.log(rootGetters.claims.links);
                return rootGetters.claims.links;
            }

            return state.navigationLinks;
        },
        getHeaderLink(state, getters){
            return getters.getNavigationLinks.filter(link => link.position === "header").sort((a,b) => b.weight - a.weight)[0];
        },
        getNavbarLinks(state, getters){
            return getters.getNavigationLinks.filter(link => link.position === "navbar").sort((a,b) => b.weight - a.weight);
        },
        getFooterLinks(state, getters){
            return getters.getNavigationLinks.filter(link => link.position === "footer").sort((a,b) => b.weight - a.weight);
        },
        getCurrentlyActiveRoute(state){
            return state.currentlyActiveRoute
        },
        getLinksUserIsAllowed(state, getters){
            return getters.getNavigationLinks;
        }
    }
}