<script>
import SingleBook from "./BookShelfItem.vue";
export default {
    name : "BookShelf",
    components : {
        SingleBook
    },
    props : {
        source : String,
        mount_action : String,
        query_params : Object 
    },
    computed : {
        Books : function(){
            return this.$store.getters.getBooks(this.source);
        }
    },
    mounted(){
        if(this.mount_action){
            this.$store.dispatch(this.mount_action, {name : this.source, params : this.query_params});
        }
    }
}
</script>
<template>
    <div class="container-fluid col-12">
        <div class="row">
            <SingleBook v-for="book, key in Books" :key="key" :book="book"/>
        </div>
    </div>
</template>