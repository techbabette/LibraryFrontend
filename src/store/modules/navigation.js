export default{
    state : {
        currentlyActiveRoute : "Home page",
        navigationLinks : [
            {
                "text" : "Početna",
                "to" : "/",
                "position" : "navbar"
            },
            {
                "text" : "Knjige",
                "to" : "/knjige",
                "position" : "navbar"
            },
            {
                "text" : "Favoriti",
                "to" : "/favoriti",
                "position" : "navbar"
            },
            {
                "text" : "O autoru",
                "to" : "/autor",
                "position" : "navbar"
            },
            {
                "url" : "https://www.facebook.com/",
                "icon" : "icomoon-free:facebook",
                "position" : "footer"
            },
            {
                "url" : "https://www.twitter.com/",
                "icon" : "la:twitter",
                "position" : "footer"
            },
            {
                "url" : "./documentation.pdf",
                "icon" : "fa-file",
                "position" : "footer"
            },
            {
                "url" : "./sitemap.xml",
                "icon" : "bx:sitemap",
                "position" : "footer"
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
        }
    }
}