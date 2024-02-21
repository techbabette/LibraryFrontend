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
                page : (this.currentTab ?? {page : 1}).page ?? 1, 
                searchParams : (this.currentTab ?? {searchParams : "empty"}).searchParams ?? {},
            }
        },
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
            let params = this.currentTab.searchParams;

            if(this.currentTab.selectedSort){
                params.sortSelected = this.currentTab.selectedSort;
            }

            params.page = this.currentTab.page;

            let items = await this.$store.dispatch("fetch", {url : this.currentTab.endpoint, params : this.currentTab.searchParams});

            this.tabs[this.currentTabName].items = items.body.data;
            this.tabs[this.currentTabName].maximumPage = items.body.last_page;

            if(items.data.sortOptions){
                let newSortOptions = {};
                items.data.sortOptions.forEach(sortOption => 
                {
                    newSortOptions[sortOption.id] = sortOption.default; 
                    if(sortOption.default && !this.currentTab.selectedSort){
                        this.currentTab.selectedSort = `${sortOption.id}_${sortOption.default}`;
                    }
                });
                this.tabs[this.currentTabName].sortOptions = newSortOptions;
            }
        },
        newSort: function(field){
            let currentlyActive = (this.currentTab.selectedSort ?? "").startsWith(field);
            if(!currentlyActive){
                this.currentTab.selectedSort = `${field}_desc`;
                this.fetchItems();
                return;
            }
            //If currently active
            let currentlyDesc = (this.currentTab.selectedSort ?? "").endsWith("_desc");
            if(currentlyDesc){
                this.currentTab.selectedSort = `${field}_asc`;
                this.fetchItems();
                return;
            }

            this.currentTab.selectedSort = `${field}_desc`;
            this.fetchItems();
            return;
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
        @refresh="fetchItems" :sort_options="currentTab.sortOptions ?? {}" :current_sort="currentTab.selectedSort ?? ''"
        @newSort="newSort"
    />
    <PageButtons v-model="currentTab['page']" :maximum_page="currentTab.maximumPage" />
</div>
</template>