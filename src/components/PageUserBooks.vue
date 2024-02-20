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
                    "title": "Currently loaned",
                    "endpoint": "loan?current=true",
                    "idField": "id",
                    "tableHeaders": [
                        {
                            "text": "Book",
                            "field": "book.name",
                        },
                        {
                            "text" : "Loaned on",
                            "field" : "started_at"
                        },
                        {
                            "text" : "Return by",
                            "field" : "end"
                        },
                        {
                            "text" : "Late",
                            "field" : "end",
                            "change" : function(item){
                                return Math.floor(new Date(item.end).getTime() / 1000) <= Math.floor((new Date()).getTime() / 1000) ? "Yes" : "No";
                            }
                        },
                        {
                            "text" : "Extended",
                            "field" : "extended",
                            "change" : function(item){
                                return item.extended ? 'Yes' : 'No'
                            }
                        }
                    ],
                    "itemOptions": [
                        {
                            "name" : "View",
                            "class" : "btn btn-primary mx-1",
                            "onClick" : "dispatch|navigation/openBookPage|callerField:book.id"
                        },
                        {
                            "name" : "Extend",
                            "class" : "btn btn-success mx-1",
                            "onClick" : "patch|loan/extend"
                        },
                        {
                            "name" : "Return",
                            "class" : "btn btn-dark mx-1",
                            "onClick" : "patch|loan/return"
                        },
                    ]
                },
                {
                    "title": "Late",
                    "endpoint": "loan?late=true",
                    "idField": "id",
                    "tableHeaders": [
                        {
                            "text": "Book",
                            "field": "book.name",
                        },
                        {
                            "text" : "Loaned on",
                            "field" : "started_at"
                        },
                        {
                            "text" : "Return by",
                            "field" : "end"
                        },
                        {
                            "text" : "Days late",
                            "field" : "end",
                            "change" : function(item){
                                let currentDate = new Date().getTime();
                                let returnBy = new Date(item.end);
                                let daysLate = Math.floor((currentDate - returnBy) / (1000 * 60 * 60 * 24)); 
                                return daysLate;
                            }
                        },
                        {
                            "text" : "Extended",
                            "field" : "extended",
                            "change" : function(item){
                                return item.extended ? 'Yes' : 'No'
                            }
                        }
                    ],
                    "itemOptions": [
                        {
                            "name" : "View",
                            "class" : "btn btn-primary mx-1",
                            "onClick" : "dispatch|navigation/openBookPage|callerField:book.id"
                        },
                        {
                            "name" : "Extend",
                            "class" : "btn btn-success mx-1",
                            "onClick" : "patch|loan/extend"
                        },
                        {
                            "name" : "Return",
                            "class" : "btn btn-dark mx-1",
                            "onClick" : "patch|loan/return"
                        },
                    ]
                },
                {
                    "title": "Previously loaned",
                    "endpoint": "loan?previous=true&onlyForUser=true",
                    "idField": "id",
                    "tableHeaders": [
                        {
                            "text": "Book",
                            "field": "book.name",
                        },
                        {
                            "text" : "Loaned on",
                            "field" : "started_at"
                        },
                        {
                            "text" : "Returned on",
                            "field" : "returned_at"
                        },
                        {
                            "text" : "Days kept",
                            "field" : "returned_at",
                            "change" : function(item){
                                let startDate = new Date(item.started_at);
                                let returnDate = new Date(item.returned_at);
                                let daysKept = Math.floor((returnDate - startDate) / (1000 * 60 * 60 * 24)); 
                                return daysKept;
                            }
                        }
                    ],
                    "itemOptions": [
                        {
                            "name" : "View",
                            "class" : "btn btn-primary mx-1",
                            "onClick" : "dispatch|navigation/openBookPage|callerField:book.id"
                        }
                    ]
                },
                {
                    "title": "Favorites",
                    "endpoint": "books/favorite",
                    "idField": "id",
                    "tableHeaders": [
                        {
                            "text": "name",
                            "field": "name",
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
            return this.Tabs.filter((tab) => tab.title == this.currentlyActiveTabTitle)[0] ?? this.Tabs[0];
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
            return this.currentActiveTab.tableHeaders
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
            <TableTab v-for="tab, index in Tabs" :key="index" :title="tab.title"
                :is_currenctly_active="currentlyActiveTabTitle === tab.title" @click.native="changeTab(tab)" />
            <GenericTable :items="itemsForCurrentlyActiveTab" :headers="currentHeaders" :options="currentActiveTab.itemOptions" @refresh="fetchItems"/>
            <PageButtons v-model="currentTabPage" :maximum_page="currentTabMaximumPage"/>
        </div>
    </div>
</template>