<script>
// import GenericTable from "./GenericTable"
// import TableTab from "./GenericTableTab"
// import PageButtons from "./ButtonsPagination.vue"
// import InputAdaptable from "./InputAdaptable.vue"
import GenericTableAdmin from "./GenericTableAdmin.vue"
export default {
    name: "PageAdminControl",

    components: {
        GenericTableAdmin
    },

    data(){
        return {
            adminTabs : {
            "Users" : {
                "title" : "Users",
                "weight" : 100,
                "endpoint" : "user",
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Email",
                        "field" : "email"
                    },
                    {
                        "text" : "Registered on",
                        "field" : "created_at"
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "Assume",
                        "class" : "btn btn-danger mx-1",
                        "onClick" : "get|user/assume"
                    }
                ],
                items : [],
                searchParams : {
                    "page" : 1
                },
                maximumPage : 1,
            },
            "Loans" : {
                "title" : "Loans",
                "weight" : 90,
                "endpoint" : "loan?panel=true",
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "User",
                        "field" : "user.email"
                    },
                    {
                        "text" : "Book",
                        "field" : "book.name"
                    },
                    {
                        "text" : "Loaned on",
                        "field" : "started_at"
                    },
                    {
                        "text" : "Returned on",
                        "field" : "returned_at",
                        change : function(item){
                            return item.returned_at ?? "/";
                        }
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "Assume",
                        "class" : "btn btn-danger mx-1",
                        "onClick" : "get|user/assume"
                    }
                ],
                items : [],
                searchInputs : {
                    "since" : {
                        label : "Loaned after",
                        field_type : "datetime"
                    }
                },
                searchParams : {
                    "page" : 1,
                    "since" : undefined
                },
                maximumPage : 1,
            },
            },
            currentTabName : "Users"
        }
    },

    computed : {
        tabs: function(){
            return this.adminTabs
        },
        currentTab : function(){
            return this.tabs[this.currentTabName]
        },
        saerchInformation: function(){
            return {
                tab : this.currentTabName,
                searchParams : this.currentTab.searchParams
            }
        }
    },

    watch : {
        saerchInformation : {
            handler: function(){
                this.refresh();
            },
            deep: true
        }
    },

    mounted(){
        this.fetchItems();
    },

    methods: {
        loadFirstTab: function(){
            let tabs = Object.keys(this.tabs);
            let firstTab = tabs[0];
            this.changeTab(firstTab);
        },
        changeTab: function(newTab){
            this.currentTabName = newTab;
        },
        fetchItems: async function(){
            let items = await this.$store.dispatch("fetch", {url : this.currentTab.endpoint, params : this.currentTab.searchParams});

            this.adminTabs[this.currentTabName].items = items.body.data;
            this.adminTabs[this.currentTabName].maximumPage = items.body.last_page;
        },
        refresh: async function(){
            await this.fetchItems();
        }
    }
}
</script>
<template>
<div>
    <h2>This is the control panel</h2>
    <GenericTableAdmin :_tabs="adminTabs" :_default_tab="currentTabName"/>
</div>
</template>