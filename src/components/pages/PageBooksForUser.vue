<template>
    <div class="mk-page">
        <div>
            <p class="h2">These are your books</p>
            <TableTab v-for="tab, index in Tabs" :key="index" :Title="tab.Title"
                :isCurrentlyActive="CurrentlyActiveTabTitle === tab.Title" @click.native="changeYourBooksTab(tab)" />
            <GenericTable :Items="ItemsForCurrentlyActiveTab" :Headers="CurrentHeaders" :Options="CurrentActiveTab.ItemOptions"/>
            <PageButtons v-model="CurrentTabPage" :maximum_page="CurrentTabMaximumPage"/>
        </div>
    </div>
</template>
<script>
import GenericTable from "../GenericTable"
import TableTab from "../GenericTableTab"
import PageButtons from "../ButtonsPagination.vue"
export default {
    name: "YourBooksPage",
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
                    "Getter": "getUserCurrentlyLoanedBooks",
                    "Endpoint": "books/loaned",
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
                            "onClick" : () => {
                                console.log("Hello I was clicked")
                            }
                        }
                    ]
                },
                {
                    "Title": "Favorites",
                    "Getter": "getUserFavoriteBooks",
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
        CurrentlyActiveTabTitle: function () {
            return this.$store.getters.getYourBooksActiveTab;
        },
        ItemsForCurrentlyActiveTab: function () {
            return this.$store.getters.getBooksForBookTab(this.CurrentlyActiveTabTitle);
        },
        CurrentActiveTab : function(){
            return this.Tabs.filter((tab) => tab.Title == this.CurrentlyActiveTabTitle)[0] ?? this.Tabs[0];
        },
        CurrentHeaders : function(){
            return this.CurrentActiveTab.TableHeaders
        },
        CurrentTabPage : {
            get(){
                return this.$store.getters.getYourBooksTabPage;
            },
            async set(value){
                let valueAndTab = {value, tab : this.CurrentActiveTab};
                await this.$store.dispatch("changeYourBooksTabPage", valueAndTab);
            }
        },
        CurrentTabMaximumPage : function(){
            return this.$store.getters.getYourBooksTabMaximumPage;
        }
    },
    methods: {
        changeYourBooksTab: function (newTab) {
            this.$store.dispatch("changeYourBooksTab", newTab);
        }
    },
    mounted(){
        this.changeYourBooksTab(this.Tabs[0])
    }
}
</script>