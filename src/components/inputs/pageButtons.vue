<template>
    <p v-if="ShowPageButtons" id="pageButtonsHolder">
    <button @click="changePage(button)" :key="key" v-for="button,key in pageButtons" :class="{active : button === CurrentPage}">
        {{ button }}
    </button>
    </p>
</template>
<script>
export default{
    name : "pageButtons",
    props : {
        value : {
            Type : Number,
        },
        MaximumPage : Number
    },
    data(){
        return {
            CurrentPage : 1
        }
    },
    computed : {
        ShowPageButtons : function(){
            return this.MaximumPage > 1;
        },
        pageButtons : function(){
            let buttonValues = [];
            if(this.CurrentPage === 1)
            {
                buttonValues = [this.CurrentPage, this.CurrentPage + 1];
                if(this.CurrentPage + 2 <= this.MaximumPage){
                    buttonValues.push(this.CurrentPage + 2);
                }

                return buttonValues;

            }
            
            buttonValues = [this.CurrentPage - 1, this.CurrentPage];

            if(this.CurrentPage + 1 <= this.MaximumPage){
                    buttonValues.push(this.CurrentPage + 1);
            }

            return buttonValues;
        }
    },
    methods : {
        changePage : function(newPage){
            this.CurrentPage = newPage;
        }
    },
    mounted(){
        this.CurrentPage = this.value;
    },
    watch: {
        CurrentPage : function() {
            this.$emit("input", this.CurrentPage)
        },
        value : function(){
            this.CurrentPage = this.value;
        }
    }
}
</script>