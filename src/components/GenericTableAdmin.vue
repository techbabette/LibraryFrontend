<script>
import GenericTable from "./GenericTable"
import TableTab from "./GenericTableTab"
import PageButtons from "./ButtonsPagination.vue"
import InputAdaptable from "./InputAdaptable.vue"
export default {
    name : "GenericTableAdmin",
    components : {
        GenericTable,
        TableTab,
        PageButtons,
        InputAdaptable
    },

    props : {
        _tabs: Object,
        _default_tab: String
    },

    data(){
        return {
            tabs : {},
            currentTabName : this._default_tab
        }
    },

    computed : {
        currentTab : function(){
            return this.tabs[this.currentTabName];
        },
        saerchInformation: function(){
            return {
                tab : this.currentTabName,
                searchParams : (this.currentTab ?? {searchParams : "empty"}).searchParams ?? {}
            }
        }
    },

    watch : {
        saerchInformation : {
            handler: function(){
                this.refresh();
            },
            deep: true
        }
    },

    beforeMount(){
        this.tabs = this._tabs;
        this.currentTabName = this._default_tab;
    },

    methods: {
        changeTab: function(newTab){
            this.currentTabName = newTab;
        },
        fetchItems: async function(){
            let items = await this.$store.dispatch("fetch", {url : this.currentTab.endpoint, params : this.currentTab.searchParams});

            this.tabs[this.currentTabName].items = items.body.data;
            this.tabs[this.currentTabName].maximumPage = items.body.last_page;
        },
        refresh: async function(){
            await this.fetchItems();
        }
    }
}
</script>
<template>
    <div v-if="currentTab">
        <TableTab v-for="tab, index in Object.keys(tabs)" :key="index" :title="tab"
        :is_currenctly_active="currentTabName === tab" @click.native="changeTab(tab)"
    />
    <div v-if="Object.keys(currentTab.searchInputs ?? {}).length > 0" class="col-12 d-flex justify-content-space-between">
        <InputAdaptable class="d-flex flex-column col-2" v-for="inputBind, index in Object.keys(currentTab.searchInputs ?? {})" 
        :key="index + 'a'" :field_type="currentTab.searchInputs[inputBind].field_type" :label="currentTab.searchInputs[inputBind].label"
        v-model="currentTab.searchParams[inputBind]"
        />
    </div>
    <div v-else>
        Search options will appear here if available
    </div>

    <GenericTable :items="currentTab.items" :headers="currentTab.tableHeaders" :options="currentTab.itemOptions"
        @refresh="fetchItems"
    />
    <PageButtons v-model="currentTab.searchParams['page']" :maximum_page="currentTab.maximumPage" />
</div>
</template>