<script>
// import GenericTable from "./GenericTable"
// import TableTab from "./GenericTableTab"
// import PageButtons from "./ButtonsPagination.vue"
// import InputAdaptable from "./InputAdaptable.vue"
import GenericTableComplete from "./GenericTableComplete.vue"
export default {
    name: "PageAdminControl",

    components: {
        GenericTableComplete
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
                },
                "page" : 1,
                maximumPage : 1,
            },
            "Authors" : {
                "title" : "Authors",
                "weight" : 95,
                "endpoint" : "author?withBookCount=true",
                "showParams" : {},
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Name",
                        "field" : "name"
                    },
                    {
                        "text" : "Last name",
                        "field" : "last_name"
                    },
                    {
                        "text" : "Books",
                        "field" : "books_count"
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "Edit",
                        "class" : "btn btn-warning mx-1",
                        "onClick" : "emit:showForm"
                    }
                ],
                items : [],
                searchInputs : {
                },
                searchParams : {
                },
                "page" : 1,
                maximumPage : 1,
            },
            "Categories" : {
                "title" : "Category",
                "weight" : 95,
                "endpoint" : "category?withActiveLoanCount=true&withLoanCount=true",
                "showParams" : {},
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Name",
                        "field" : "text"
                    },
                    {
                        "text" : "Books",
                        "field" : "books_count"
                    },
                    {
                        "text" : "Active loans",
                        "field" : "active_loans_count"
                    },
                    {
                        "text" : "Total loans",
                        "field" : "loans_count"
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "Edit",
                        "class" : "btn btn-warning mx-1",
                        "onClick" : "emit:showForm"
                    }
                ],
                items : [],
                searchInputs : {
                },
                searchParams : {
                },
                page : 1,
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
                    "since" : undefined
                },
                "page" : 1,
                maximumPage : 1,
            },
            },
            currentTabName : "Users"
        }
    },
}
</script>
<template>
<div>
    <GenericTableComplete :_tabs="adminTabs" :_default_tab="currentTabName"/>
</div>
</template>