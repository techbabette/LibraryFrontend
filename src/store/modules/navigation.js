export default{
    state : {
        currentlyActiveRoute : "Home page",
        navigationLinks : [
            {
                "text" : "Home",
                "to" : "/",
                "name" : "Home",
                "position" : "navbar",
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "text" : "Books",
                "to" : "/books",
                "name" : "Books",
                "position" : "navbar",
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "text" : "Favorites",
                "to" : "/favorites",
                "name" : "Favorites",
                "position" : "navbar",
                "showTo" : ["standard", "admin"]
            },
            {
                "text" : "Login",
                "to" : "/login",
                "name" : "Login",
                "position" : "navbar",
                "showTo" : ["logged out"]
            },
            {
                "text" : "Register",
                "to" : "/register",
                "name" : "Register",
                "position" : "navbar",
                "showTo" : ["logged out"]
            },
            {
                "text" : "Author",
                "to" : "/author",
                "name" : "Author",
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