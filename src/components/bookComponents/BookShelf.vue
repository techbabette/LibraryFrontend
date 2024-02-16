<template>
    <div class="container-fluid col-12">
        <div class="row">
            <SingleBook v-for="book, key in Books" :key="key" :Book="book"/>
        </div>
    </div>
</template>
<script>
import SingleBook from "./SingleBook.vue";
export default {
    name : "BookShelf",
    components : {
        SingleBook
    },
    props : {
        Source : String,
        mountAction : String,
        queryParams : Object 
    },
    computed : {
        Books : function(){
            return this.$store.getters.getBooks(this.Source);
        }
    },
    mounted(){
        if(this.mountAction){
            this.$store.dispatch(this.mountAction, {name : this.Source, params : this.queryParams});
        }
    }
}
</script>