import Vue from "vue";

export default {
    state: {
        currentlyActiveTab : "",
        dataForTabTable : 
        {
        }
    },
    getters : {
        getYourBooksActiveTab : function(state){
            return state.currentlyActiveTab
        },
        getYourBooksTabPage : function(state, getters) {
            if(typeof state.dataForTabTable[getters.getYourBooksActiveTab] === 'undefined'){
                console.log("Heyy")
                return 1;
            }
            return state.dataForTabTable[getters.getYourBooksActiveTab].page
        },
        getYourBooksTabMaximumPage : function(state) {
            if(typeof state.dataForTabTable[state.currentlyActiveTab] === 'undefined'){
                return 1;
            }
            return state.dataForTabTable[state.currentlyActiveTab].maxPage
        },
        getBooksForBookTab : (state) => (tab) => {
            if(typeof state.dataForTabTable[tab] === 'undefined'){
                return [];
            }
            return state.dataForTabTable[tab].items;
        }
    },
    mutations : {
    },
    actions : {
        changeYourBooksTab : async function({state, dispatch}, newTab){
            if(typeof(state.dataForTabTable[newTab.Title]) === 'undefined'){
                let newTabObject = {};
                newTabObject.page = 1;
                newTabObject.maxPage = 3;
                newTabObject.items = [];
                Vue.set(state.dataForTabTable, newTab.Title, newTabObject);
            }

            await dispatch("fetchItemsForBookTab", newTab);

            state.currentlyActiveTab = newTab.Title
        },
        changeYourBooksTabPage : async function({state, dispatch}, newTabPage){
            state.dataForTabTable[state.currentlyActiveTab].page = newTabPage.value;

            await dispatch("fetchItemsForBookTab", newTabPage.tab);
        },
        fetchItemsForBookTab :  async function({state}, tab){
            //Make a request to the endpoint 

            state.dataForTabTable[tab.Title].items = [{id: 2, name : "First book"}, {id: 1, name : "Second book"}];
        }
    }
}