export default{
    state : {
        currentlyActiveRoute : "Home page",
        navigationLinks : [
            {
                "text" : "City Library",
                "to" : "Home",
                "position" : "header",
                "weight" : 100,
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "text" : "Home",
                "to" : "Home",
                "position" : "navbar",
                "weight" : 100,
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "text" : "Books",
                "to" : "Books",
                "position" : "navbar",
                "weight" : 90,
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "text" : "Favorites",
                "to" : "Favorites",
                "position" : "navbar",
                "weight" : 89,
                "showTo" : ["standard", "admin"]
            },
            {
                "text" : "Login",
                "to" : "Login",
                "position" : "navbar",
                "weight" : 80,
                "showTo" : ["logged out"]
            },
            {
                "text" : "Register",
                "to" : "Register",
                "position" : "navbar",
                "weight" : 79,
                "showTo" : ["logged out"]
            },
            {
                "text" : "Author",
                "to" : "Author",
                "position" : "navbar",
                "weight" : 0,
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "to" : "https://www.facebook.com/",
                "icon" : "icomoon-free:facebook",
                "position" : "footer",
                "weight" : 100,
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "to" : "https://www.twitter.com/",
                "icon" : "la:twitter",
                "position" : "footer",
                "weight" : 90,
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "to" : "./documentation.pdf",
                "icon" : "fa-file",
                "position" : "footer",
                "weight" : 80,
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "to" : "./sitemap.xml",
                "icon" : "bx:sitemap",
                "position" : "footer",
                "weight" : 70,
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
            return state.navigationLinks.filter(link => link.position === "header").sort((a,b) => a.weight - b.weight)[0];
        },
        getNavbarLinks(state){
            return state.navigationLinks.filter(link => link.position === "navbar").sort((a,b) => a.weight - b.weight);
        },
        getFooterLinks(state){
            return state.navigationLinks.filter(link => link.position === "footer").sort((a,b) => a.weight - b.weight);
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