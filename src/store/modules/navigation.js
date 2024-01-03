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
                "to" : "autor",
                "position" : "navbar"
            },
            {
                "to" : "https://www.facebook.com/",
                "text" : "icomoon-free:facebook",
                "position" : "footer"
            },
            {
                "to" : "https://www.twitter.com/",
                "text" : "la:twitter",
                "position" : "footer"
            },
            {
                "to" : "documentation.pdf",
                "text" : "fa-file",
                "position" : "footer"
            },
            {
                "to" : "sitemap.xml",
                "text" : "bx:sitemap",
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