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
}
</script>
<template>
<div>
    <h2>This is the control panel</h2>
    <GenericTableAdmin :_tabs="adminTabs" :_default_tab="currentTabName"/>
</div>
</template>