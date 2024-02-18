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
                    "Endpoint": "loans",
                    "IdField": "id",
                    "TableHeaders": [
                        {
                            "Text": "Name",
                            "Field": "name",
                        },
                        {
                            "Text": "Id",
                            "Field": "id"
                        }
                    ],
                    "ItemOptions": [
                        {
                            "Name" : "Return",
                            "Class" : "btn btn-dark",
                            "onClick" : "patch|loans/return"
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
        CurrentActiveTab : function(){
            return this.Tabs.filter((tab) => tab.Title == this.CurrentlyActiveTabTitle)[0] ?? this.Tabs[0];
        },
        CurrentTabPage : {
            get(){
                return this.$store.getters['userbooks/tabPage'];
            },
            async set(value){
                let valueAndTab = {value, tab : this.CurrentActiveTab};
                await this.$store.dispatch("userbooks/changeTabPage", valueAndTab);
            }
        },
        CurrentlyActiveTabTitle: function () {
            return this.$store.getters['userbooks/activeTab'];
        },
        ItemsForCurrentlyActiveTab: function () {
            return this.$store.getters['userbooks/tabItems'](this.CurrentlyActiveTabTitle);
        },
        CurrentHeaders : function(){
            return this.CurrentActiveTab.TableHeaders
        },
        CurrentTabMaximumPage : function(){
            return this.$store.getters['userbooks/tabMaximumPage'];
        }
    },

    mounted(){
        this.changeTab(this.Tabs[0])
    },

    methods: {
        changeTab: function (newTab) {
            this.$store.dispatch("userbooks/changeTab", newTab);
        }
    },
}
</script>
<template>
    <div class="mk-page">
        <div>
            <p class="h2">These are your books</p>
            <TableTab v-for="tab, index in Tabs" :key="index" :title="tab.Title"
                :is_currenctly_active="CurrentlyActiveTabTitle === tab.Title" @click.native="changeTab(tab)" />
            <GenericTable :items="ItemsForCurrentlyActiveTab" :headers="CurrentHeaders" :options="CurrentActiveTab.ItemOptions"/>
            <PageButtons v-model="CurrentTabPage" :maximum_page="CurrentTabMaximumPage"/>
        </div>
    </div>
</template>