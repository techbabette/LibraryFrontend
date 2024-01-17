export default{
    state : {
        currentlyActiveRoute : "Home page",
        navigationLinks : [
            {
                "text" : "Početna",
                "to" : "/",
                "name" : "Početna",
                "position" : "navbar",
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "text" : "Knjige",
                "to" : "/knjige",
                "name" : "Knjige",
                "position" : "navbar",
                "showTo" : ["logged out", "standard", "admin"]
            },
            {
                "text" : "Favoriti",
                "to" : "/favoriti",
                "name" : "Favoriti",
                "position" : "navbar",
                "showTo" : ["standard", "admin"]
            },
            {
                "text" : "Logovanje",
                "to" : "/login",
                "name" : "Login",
                "position" : "navbar",
                "showTo" : ["logged out"]
            },
            {
                "text" : "Registracija",
                "to" : "/register",
                "name" : "Register",
                "position" : "navbar",
                "showTo" : ["logged out"]
            },
            {
                "text" : "O autoru",
                "to" : "/autor",
                "name" : "Autor",
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