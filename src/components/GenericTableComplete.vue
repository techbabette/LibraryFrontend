<script>
import GenericTable from "./GenericTable"
import TableTab from "./GenericTableTab"
import PageButtons from "./ButtonsPagination.vue"
import InputForm from "./InputForm.vue"
import axiosInstance from "@/axios/axios"
export default {
    name : "GenericTableComplete",
    components : {
        GenericTable,
        TableTab,
        PageButtons,
        InputForm
    },

    props : {
        _tabs: Object,
        _forms : Object,
        _default_tab: String,
    },

    data(){
        return {
            tabs : {},
            forms : {},
            currentTabName : this._default_tab,
            formData : {},
            showForm : false,
            openFormIndex : -1
        }
    },

    computed : {
        currentTab : function(){
            return this.tabs[this.currentTabName];
        },
        baseEndpoint : function(){
            return this.currentTab.endpoint.split("?")[0];
        },
        saerchInformation: function(){
            return {
                tab : this.currentTabName,
                page : (this.currentTab ?? {page : 1}).page ?? 1, 
                searchParams : (this.currentTab ?? {searchParams : "empty"}).searchParams ?? {},
                selectedSort : (this.currentTab ?? {selectedSort : ""}).selectedSort ?? ""
            }
        },
    },

    watch : {
        saerchInformation : {
            handler: function(oldData, newData){
                if(oldData.page === newData.page){
                    this.currentTab.page = 1;
                }
                this.refresh();
            },
            deep: true
        },
        tabs : {
            handler: function(){
                this.$emit("newTabState", this.tabs);
            },
            deep : true
        },
        currentTabName : {
            handler: function(){
                this.$emit("newTab", this.currentTabName);
            }
        },
        _default_tab : {
            handler: function(){
                this.currentTabName = this._default_tab;
            }
        },
        _tabs: {
            handler: function(){
                this.tabs = this._tabs;
            },
            deep : true
        }
    },

    beforeMount(){
        this.tabs = this._tabs;
        this.forms = this._forms ?? {};
        this.currentTabName = this._default_tab;
    },

    methods: {
        changeTab: function(newTab){
            this.currentTabName = newTab;
        },
        fetchItems: async function(){
            let params = {...this.currentTab.searchParams};

            if(this.currentTab.selectedSort){
                params.sortSelected = this.currentTab.selectedSort;
            }

            params.page = this.currentTab.page;

            let items = await this.$store.dispatch("fetch", {url : this.currentTab.endpoint, params});

            this.tabs[this.currentTabName].items = items.body.data;
            this.tabs[this.currentTabName].maximumPage = items.body.last_page;

            if(items.data.sortOptions){
                let newSortOptions = items.data.sortOptions.map((option) => option.id);
                if(items.data.sortDefault && !this.currentTab.selectedSort){
                    this.currentTab.selectedSort = items.data.sortDefault;
                }
                this.tabs[this.currentTabName].sortOptions = newSortOptions;
            }
        },
        newSort: function(field){
            let currentlyActive = (this.currentTab.selectedSort ?? "").startsWith(field);
            if(!currentlyActive){
                this.currentTab['selectedSort'] = `${field}_desc`;
                return;
            }
            //If currently active
            let currentlyDesc = (this.currentTab.selectedSort ?? "").endsWith("_desc");
            if(currentlyDesc){
                this.currentTab['selectedSort'] = `${field}_asc`;
                return;
            }

            this.currentTab['selectedSort'] = `${field}_desc`;
            return;
        },
        openForm : async function(callerId = 0){
            //If called with id, get current information and store to formData before opening

            let method = callerId ? "patch" : "post";

            if(method === "patch"){
                let currentInformation = (await axiosInstance.get(`${this.baseEndpoint}/${callerId}`)).body;
                this.formData = currentInformation;
            }

            //After form is ready, set showForm to true
            this.showForm = true;
        },
        refresh: async function(){
            await this.fetchItems();
        }
    }
}
</script>
<template>
    <div>
        <div class="overflow-x-scroll d-flex">
            <TableTab v-for="tab, index in Object.keys(tabs)" :key="index" :title="tab"
            :is_currenctly_active="currentTabName === tab" @click.native="changeTab(tab)"/>
        </div>
    <div class="adminBorder rounded-left rounded-bottom rounded-right">
        <div v-if="Object.keys(currentTab.searchInputs ?? {}).length > 0" class="col-12 d-flex justify-content-start">
            <InputForm :elements="currentTab.searchInputs" v-model="currentTab.searchParams"/>
        </div>
        <div v-else>
            Search options will appear here if available
        </div>

        <GenericTable :items="currentTab.items" :headers="currentTab.tableHeaders" :options="currentTab.itemOptions"
            @refresh="fetchItems" :sort_options="currentTab.sortOptions ?? []" :current_sort="currentTab.selectedSort ?? ''"
            @newSort="newSort" :first_item_positon="(currentTab.page - 1) * (currentTab.perPage ?? 5)" @openForm="openForm"
        />
    </div>

    <div id="modal-background" class="mk-modal" :class="{hidden : !showForm}">
        <div class="mk-modal-content" >
            <InputForm :elements="(forms[currentTabName] ?? {elements : {}}).elements" v-model="formData"/>
        </div>
    </div>

    <PageButtons v-model="currentTab['page']" :maximum_page="currentTab.maximumPage" buttonClass="bg-white text-dark"/>
</div>
</template>

<style>
.adminBorder {
	border: 2px solid black;
    border-top: 0px;
}
.text-dark{
    color: grey !important;
}
.text-dark.active{
    border: 1.5px solid black !important;
    color: black !important;
}
.text-dark:hover{
    color: black !important;
}
</style>

<style scoped>
.overflow-x-scroll{
    overflow-x: scroll;
}
.mk-modal-content{
    color: white;
}
</style>