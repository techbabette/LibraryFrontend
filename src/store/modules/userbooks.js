import Vue from "vue";
import axios from "@/axios/axios";
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
                newTabObject.maxPage = 1;
                newTabObject.items = [];
                Vue.set(state.dataForTabTable, newTab.Title, newTabObject);
            }

            state.currentlyActiveTab = newTab.Title
            await dispatch("fetchItemsForTab", newTab);
        },
        changeTabPage : async function({state, dispatch}, newTabPage){
            state.dataForTabTable[state.currentlyActiveTab].page = newTabPage.value;

            await dispatch("fetchItemsForTab", newTabPage.tab);
        },
        fetchItemsForTab :  async function({state}, tab){
            //Make a request to the endpoint 
            let params = {page : state.dataForTabTable[state.currentlyActiveTab].page, perPage : 5};
            let result = await axios.get(tab.Endpoint, {params});

            if(!result.success){
                return;
            }

            let maximumPage = result.body.last_page;
            if(maximumPage < state.dataForTabTable[state.currentlyActiveTab].page){
                if(maximumPage === 1){
                    state.dataForTabTable[tab.Title].page = 1;
                }else{
                    state.dataForTabTable[tab.Title].page = maximumPage - 1;
                }
            }
            let items = result.body.data;
            state.dataForTabTable[tab.Title].maxPage = maximumPage;
            state.dataForTabTable[tab.Title].items = items;
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
        tabItems : (state) => (tab) => {
            if(typeof state.dataForTabTable[tab] === 'undefined'){
                return [];
            }
            return state.dataForTabTable[tab].items;
        }
    },
}