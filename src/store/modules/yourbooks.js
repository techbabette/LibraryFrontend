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
            console.log(newTab);
            if(typeof(state.dataForTabTable[newTab.Title]) === 'undefined'){
                let newTabObject = {};
                newTabObject.page = 1;
                newTabObject.maxPage = 1;
                newTabObject.items = [];
                state.dataForTabTable[newTab.Title] = newTabObject;
            }

            await dispatch("fetchItemsForBookTab", newTab);

            state.currentlyActiveTab = newTab.Title
        },
        fetchItemsForBookTab :  async function({state}, tab){
            //Make a request to the endpoint 

            state.dataForTabTable[tab.Title].items = [{id: 2, name : "First book"}];
        }
    }
}