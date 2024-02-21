<script>
import GenericTableAdmin from "./GenericTableAdmin.vue"
export default {
    name: "PageAdminLogs",

    components: {
        GenericTableAdmin
    },

    data(){
        return {
            tabs : {
                "Logs" : {
                    "title" : "Users",
                    "weight" : 100,
                    "endpoint" : "log",
                    "idField" : "id",
                    "tableHeaders" : [
                        {
                            "text" : "Actor",
                            "field" : "issuer",
                        },
                        {
                            "text" : "Action",
                            "field" : "action"
                        },
                        {
                            "text" : "Performed on",
                            "field" : "created_at" 
                        }
                    ],
                    items : [],
                    searchParams : {
                    },
                    "page" : 1,
                    maximumPage : 1,
                },
            },
            currentTab : "Logs"
        }
    }
}
</script>
<template>
    <GenericTableAdmin :_tabs="tabs" :_default_tab="currentTab"/>
</template>