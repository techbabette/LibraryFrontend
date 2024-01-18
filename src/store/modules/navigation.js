export default{
    state : {
        currentlyActiveRoute : "Home page",
        navigationLinks : [
            {
                "text" : "City Library",
                "to" : "Home",
                "position" : "header",
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "text" : "Home",
                "to" : "Home",
                "position" : "navbar",
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "text" : "Books",
                "to" : "Books",
                "position" : "navbar",
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "text" : "Favorites",
                "to" : "Favorites",
                "position" : "navbar",
                "showTo" : ["standard", "admin"]
            },
            {
                "text" : "Login",
                "to" : "Login",
                "position" : "navbar",
                "showTo" : ["logged out"]
            },
            {
                "text" : "Register",
                "to" : "Register",
                "position" : "navbar",
                "showTo" : ["logged out"]
            },
            {
                "text" : "Author",
                "to" : "Author",
                "position" : "navbar",
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "to" : "https://www.facebook.com/",
                "icon" : "icomoon-free:facebook",
                "position" : "footer",
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "to" : "https://www.twitter.com/",
                "icon" : "la:twitter",
                "position" : "footer",
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "to" : "./documentation.pdf",
                "icon" : "fa-file",
                "position" : "footer",
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "to" : "./sitemap.xml",
                "icon" : "bx:sitemap",
                "position" : "footer",
                "showTo" : ["logged out", "standard", "admin"]
            }
        ]
    },
    mutations : {
        changeActiveRouteName(state, newRouteName){
            state.currentlyActiveRoute = newRouteName
        }
    },
    getters : {
        getHeaderLink(state){
            return state.navigationLinks.filter(link => link.position === "header")[0];
        },
        getNavbarLinks(state){
            return state.navigationLinks.filter(link => link.position === "navbar");
        },
        getFooterLinks(state){
            return state.navigationLinks.filter(link => link.position === "footer");
        },
        getCurrentlyActiveRoute(state){
            return state.currentlyActiveRoute
        },
        getLinksUserIsAllowed(state, getters, rootState, rootGetters){
            let userRole = rootGetters.activeUserRole;

            return state.navigationLinks.filter(link => link.showTo.includes(userRole));
        }
    }
}