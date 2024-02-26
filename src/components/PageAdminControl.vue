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
            forms : {
                "Books" : {
                    "name" : {
                        "label" : "Name",
                        "field_type" : "string"
                    },
                    "category_id" : {
                        "label" : "Category",
                        "field_type" : "select",
                        "source" : "get|category?noPage=true",
                        "options_text_field" : "text"
                    },
                    "author_id" : {
                        "label" : "Author",
                        "field_type" : "select",
                        "source" : "get|author?noPage=true",
                        "options_text_field" : "full_name"
                    },
                    "description" : {
                        "label" : "Description",
                        "field_type" : "text"
                    },
                    "number_owned" : {
                        "label" : "Number owned",
                        "field_type" : "number"
                    }
                }
            }
        }
    },

    computed : {
        adminTabs : function(){
            return this.$store.getters['admin/getTabs'];
        },
        currentTabName : function(){
            return this.$store.getters['admin/getCurrentTab'];
        }
    },

    methods: {
        setTabState : function(newTabState){
            this.$store.commit('admin/setTabs', newTabState);
        },
        setTabName : function(newTabName){
            this.$store.commit('admin/setCurrentTab', newTabName);
        }
    }
}
</script>
<template>
<div>
    <GenericTableComplete :_tabs="adminTabs" :_forms="forms" :_default_tab="currentTabName" @newTabState="setTabState" @newTab="setTabName"/>
</div>
</template>