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
            let [newUsers, newLoans, activeLoans, lateLoans] = await Promise.all([
                this.$store.dispatch("fetch", {url : "/user", params : {onlyCount : true}}),
                this.$store.dispatch("fetch", {url : "/loan", params : {onlyCount : true}}),
                this.$store.dispatch("fetch", {url : "/loan", params : {onlyCount : true, current : true}}),
                this.$store.dispatch("fetch", {url : "/user", params : {onlyCount : true, late  : true}}),
            ])

            this.InfoBlocksData.activeLoans = activeLoans.body;
            this.InfoBlocksData.lateLoans = lateLoans.body;
            this.InfoBlocksData.newUsers = newUsers.body;

            console.log(newLoans);
        }
    },
}
</script>
<template>
    <div class="col-12 admin-page px-2">
        <h2>Welcome to the dashboard, {{ adminName }}</h2>
        <hr>
        <div class="col-12 d-flex flex-row flex-wrap p-2 align-items-center">
            <div class="col-12 d-flex flex-column col-md-6 justify-content-center">
                <InfoBlock prop_class="border col-12 col-md-11 my-2 p-2 bg-success text-white text-center" title="New users" :max_value="this.InfoBlocksData.newUsers"/>
                <InfoBlock prop_class="border col-12 col-md-11 my-2 p-2 bg-primary text-white text-center" title="New loans" :max_value="50"/>
            </div>
            <div class="col-12 d-flex flex-column col-md-6 align-items-center">
                <InfoBlock prop_class="border col-12 col-md-11 my-2 p-2 bg-info text-white text-center" title="Active loans" :max_value="this.InfoBlocksData.activeLoans"/>
                <InfoBlock prop_class="border col-12 col-md-11 my-2 p-2 bg-danger text-white text-center" title="Late loans" :max_value="this.InfoBlocksData.lateLoans"/>
            </div>
        </div>
    </div>
</template>

<style>
.admin-page{
    max-width: 80vw;
}
@media only screen and (min-width: 600px) {
.admin-page{
    max-width: 90vw;
}
}
</style>