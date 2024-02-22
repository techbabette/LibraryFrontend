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
    <GenericTableComplete :_tabs="adminTabs" :_default_tab="currentTabName" @newTabState="setTabState" @newTab="setTabName"/>
</div>
</template>