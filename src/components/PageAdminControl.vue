<script>
import GenericTable from "./GenericTable"
import TableTab from "./GenericTableTab"
import PageButtons from "./ButtonsPagination.vue"
import InputAdaptable from "./InputAdaptable.vue"
export default {
    name: "PageAdminControl",

    components: {
        GenericTable,
        TableTab,
        PageButtons,
        InputAdaptable
    },

    data(){
        return {
        }
    },

    computed : {
        currentTabName : function(){
            return this.$store.getters['admin/getCurrentTab'];
        },
        currentTab : function(){
            return this.$store.getters['admin/getTab'];
        },
        currentPage :{
            get : function(){
                return this.currentTab.page;
            },
            set : function(value){
                this.$store.commit("admin/setTabSearchParam", {name : 'page' ,value});
            }
        },
        tabs: function(){
            return this.$store.getters['admin/getTabs']
        },
        saerchInformation: function(){
            return {
                tab : this.currentTabName,
                searchParams : this.currentTab.searchParams
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

    mounted(){
        this.fetchItems();
    },

    methods: {
        loadFirstTab: function(){
            let tabs = Object.keys(this.tabs);
            let firstTab = tabs[0];
            this.changeTab(firstTab);
        },
        changeTab: function(newTab){
            this.$store.commit('admin/setCurrentTab', newTab);
        },
        fetchItems: async function(){
            let items = await this.$store.dispatch("fetch", {url : this.currentTab.endpoint, params : this.currentTab.searchParams});

            this.$store.commit("admin/setTabField", {name : 'items', value : items.body.data});
            this.$store.commit("admin/setTabField", {name : 'maximumPage' ,value : items.body.last_page});
        },
        refresh: async function(){
            await this.fetchItems();
        }
    }
}
</script>
<template>
<div>
    <h2>This is the control panel</h2>
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