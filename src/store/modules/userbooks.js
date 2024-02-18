import Vue from "vue";

export default {
    namespaced: true,
    state: {
        currentlyActiveTab : "",
        dataForTabTable : 
        {
        }
    },
    actions : {
        changeTab : async function({state, dispatch}, newTab){
            if(typeof(state.dataForTabTable[newTab.Title]) === 'undefined'){
                let newTabObject = {};
                newTabObject.page = 1;
                newTabObject.maxPage = 3;
                newTabObject.items = [];
                Vue.set(state.dataForTabTable, newTab.Title, newTabObject);
            }

            await dispatch("fetchItemsForTab", newTab);

            state.currentlyActiveTab = newTab.Title
        },
        changeTabPage : async function({state, dispatch}, newTabPage){
            state.dataForTabTable[state.currentlyActiveTab].page = newTabPage.value;

            await dispatch("fetchItemsForTab", newTabPage.tab);
        },
        fetchItemsForTab :  async function({state}, tab){
            //Make a request to the endpoint 

            state.dataForTabTable[tab.Title].items = [{id: 2, name : "First book"}, {id: 1, name : "Second book"}];
        }
    },
    mutations : {
    },
    getters : {
        activeTab : function(state){
            return state.currentlyActiveTab
        },
        tabPage : function(state, getters) {
            if(typeof state.dataForTabTable[getters.activeTab] === 'undefined'){
                return 1;
            }
            return state.dataForTabTable[getters.activeTab].page
        },
        tabMaximumPage : function(state) {
            if(typeof state.dataForTabTable[state.currentlyActiveTab] === 'undefined'){
                return 1;
            }
            return state.dataForTabTable[state.currentlyActiveTab].maxPage
        },
        tabBooks : (state) => (tab) => {
            if(typeof state.dataForTabTable[tab] === 'undefined'){
                return [];
            }
            return state.dataForTabTable[tab].items;
        }
    },
}