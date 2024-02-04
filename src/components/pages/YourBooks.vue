<template>
    <div class="mk-page">
        <div>
            <p class="h2">Welcome to Your Books</p>
            <TableTab v-for="tab, index in Tabs" :key="index" :Title="tab.Title"
                :isCurrentlyActive="CurrentlyActiveTabTitle === tab.Title" @click.native="changeYourBooksTab(tab)" />
            <GenericTable :Items="ItemsForCurrentlyActiveTab" :Headers="CurrentHeaders" :Options="CurrentActiveTab.ItemOptions"/>
        </div>
    </div>
</template>
<script>
import GenericTable from "../tableComponents/GenericTable"
import TableTab from "../tableComponents/TableTab"
export default {
    name: "YourBooksPage",
    components: {
        GenericTable,
        TableTab
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
                    "ItemOptions": [
                        {
                            "Name" : "Return",
                            "Class" : "btn btn-dark",
                            "onClick" : () => {
                                console.log("Hello I was clicked")
                            }
                        }
                    ]
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