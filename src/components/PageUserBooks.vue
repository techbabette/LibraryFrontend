<script>
import GenericTable from "./GenericTable"
import TableTab from "./GenericTableTab"
import PageButtons from "./ButtonsPagination.vue"
export default {
    name: "PageUserBooks",

    components: {
        GenericTable,
        TableTab,
        PageButtons
    },

    data() {
        return {
            Tabs: [
                {
                    "Title": "Currently loaned",
                    "Endpoint": "loan?current=true&onlyForUser=true",
                    "IdField": "id",
                    "TableHeaders": [
                        {
                            "Text": "Book",
                            "Field": "book.name",
                        },
                        {
                            "Text" : "Loaned on",
                            "Field" : "start"
                        },
                        {
                            "Text" : "Return by",
                            "Field" : "end"
                        },
                        {
                            "Text" : "Extended",
                            "Field" : "extended",
                            "Change" : function(val){
                                return val ? 'Yes' : 'No'
                            }
                        }
                    ],
                    "ItemOptions": [
                        {
                            "Name" : "View",
                            "Class" : "btn btn-primary mx-1",
                            "onClick" : "dispatch|navigation/openBookPage|callerField:book.id"
                        },
                        {
                            "Name" : "Extend",
                            "Class" : "btn btn-success mx-1",
                            "onClick" : "patch|loan/extend"
                        },
                        {
                            "Name" : "Return",
                            "Class" : "btn btn-dark mx-1",
                            "onClick" : "patch|loan/return"
                        },
                    ]
                },
                {
                    "Title": "Previously loaned",
                    "Endpoint": "loan?previous=true&onlyForUser=true",
                    "IdField": "id",
                    "TableHeaders": [
                        {
                            "Text": "Book",
                            "Field": "book.name",
                        },
                        {
                            "Text" : "Loaned on",
                            "Field" : "start"
                        },
                        {
                            "Text" : "Returned on",
                            "Field" : "returned"
                        }
                    ],
                    "ItemOptions": [
                        {
                            "Name" : "View",
                            "Class" : "btn btn-primary mx-1",
                            "onClick" : "dispatch|navigation/openBookPage|callerField:book.id"
                        }
                    ]
                },
                {
                    "Title": "Favorites",
                    "Endpoint": "books/favorite",
                    "IdField": "id",
                    "TableHeaders": [
                        {
                            "Text": "Name",
                            "Field": "name",
                        }
                    ],
                }
            ]
        }
    },

    computed: {
        username : function(){
            return this.$store.getters['user/claims'].name;
        },
        currentActiveTab : function(){
            return this.Tabs.filter((tab) => tab.Title == this.currentlyActiveTabTitle)[0] ?? this.Tabs[0];
        },
        currentTabPage : {
            get(){
                return this.$store.getters['userbooks/tabPage'];
            },
            async set(value){
                let valueAndTab = {value, tab : this.currentActiveTab};
                await this.$store.dispatch("userbooks/changeTabPage", valueAndTab);
            }
        },
        currentlyActiveTabTitle: function () {
            return this.$store.getters['userbooks/activeTab'];
        },
        itemsForCurrentlyActiveTab: function () {
            return this.$store.getters['userbooks/tabItems'](this.currentlyActiveTabTitle);
        },
        currentHeaders : function(){
            return this.currentActiveTab.TableHeaders
        },
        currentTabMaximumPage : function(){
            return this.$store.getters['userbooks/tabMaximumPage'];
        }
    },

    mounted(){
        this.changeTab(this.Tabs[0])
    },

    methods: {
        changeTab: function (newTab) {
            this.$store.dispatch("userbooks/changeTab", newTab);
        },
        fetchItems: function (){
            this.$store.dispatch('userbooks/fetchItemsForTab', this.currentActiveTab);
        }
    },
}
</script>
<template>
    <div class="mk-page">
        <div>
            <p class="h2">These are your books, {{ username }}</p>
            <TableTab v-for="tab, index in Tabs" :key="index" :title="tab.Title"
                :is_currenctly_active="currentlyActiveTabTitle === tab.Title" @click.native="changeTab(tab)" />
            <GenericTable :items="itemsForCurrentlyActiveTab" :headers="currentHeaders" :options="currentActiveTab.ItemOptions" @refresh="fetchItems"/>
            <PageButtons v-model="currentTabPage" :maximum_page="currentTabMaximumPage"/>
        </div>
    </div>
</template>