<script>
import InfoBlock from '@/components/InfoBlock.vue';
export default {
    name : "PageAdminDashboard",

    components : {
        InfoBlock
    },

    data(){
        return {
            InfoBlocksData : {
                "activeLoans" : 0,
                "lateLoans" : 0,
                "newLoans" : 0,
                "newUsers" : 0
            }
        }
    },

    computed:{
        adminName: function(){
            return this.$store.getters['user/claims'].name;
        }
    },

    mounted(){
        this.loadInfoBlocksData();
    },

    methods:{
        loadInfoBlocksData : async function(){
            let yesterdayDate = new Date();
            yesterdayDate.setDate(yesterdayDate.getDate() - 1);
            yesterdayDate = yesterdayDate.toISOString();
            let [newUsers, newLoans, activeLoans, lateLoans, categoriesWithLoans] = await Promise.all([
                this.$store.dispatch("fetch", {url : "/user", params : {onlyCount : true, since : yesterdayDate}}),
                this.$store.dispatch("fetch", {url : "/loan", params : {onlyCount : true, since : yesterdayDate}}),
                this.$store.dispatch("fetch", {url : "/loan", params : {onlyCount : true}}),
                this.$store.dispatch("fetch", {url : "/user", params : {onlyCount : true, late  : true}}),
                this.$store.dispatch("fetch", {url : "/category", params : {onlyLoanCount : true}}),
            ])

            this.InfoBlocksData.activeLoans = activeLoans.body;
            this.InfoBlocksData.lateLoans = lateLoans.body;
            this.InfoBlocksData.newLoans = newLoans.body;
            this.InfoBlocksData.newUsers = newUsers.body;

            console.log(categoriesWithLoans);
        }
    },
}
</script>
<template>
    <div class="col-12 px-2 py-1">
        <h2>Welcome to the dashboard, {{ adminName }}</h2>
        <hr>
        <div class="col-12 d-flex flex-row flex-wrap p-2 align-items-center">
            <div class="col-12 d-flex flex-column col-md-6 justify-content-center">
                <InfoBlock prop_class="border shadow rounded col-12 col-md-11 my-2 p-2 bg-success text-white text-center"
                 title="New users" :max_value="this.InfoBlocksData.newUsers"/>
                <InfoBlock prop_class="border shadow rounded col-12 col-md-11 my-2 p-2 bg-primary text-white text-center"
                 title="New loans" :max_value="this.InfoBlocksData.newLoans"/>
            </div>
            <div class="col-12 d-flex flex-column col-md-6 align-items-center">
                <InfoBlock prop_class="border shadow rounded col-12 col-md-11 my-2 p-2 bg-info text-white text-center"
                 title="Active loans" :max_value="this.InfoBlocksData.activeLoans"/>
                <InfoBlock prop_class="border shadow rounded col-12 col-md-11 my-2 p-2 bg-danger text-white text-center"
                 title="Late loans" :max_value="this.InfoBlocksData.lateLoans"/>
            </div>
        </div>
    </div>
</template>

<style>

</style>