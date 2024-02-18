<script>
export default {
    name : "InputDropdownSelectMultiple",

    props : {
        name : String,
        options : Array,
        text_field : {
            default : 'name',
            type : String
        },
        value_field : {
            default : 'id',
            type : String
        },
        value : {
            type: [Array]
        },
    },
    data(){
        return {
            localValue : []
        }
    },

    watch: {
       localValue: function() {
           this.$emit("input", this.localValue)
       },
       value: function() {
           this.localValue = this.value
       }
   },

    mounted() {
       this.localValue = this.value
    },
}
</script>
<template>
    <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
        {{name}}
    </button>
    <ul class="dropdown-menu" id="categoryHolder" aria-labelledby="dropdownMenuButton1">
        <li v-for="option, key in options" :key="key">
            <div  class="d-flex flex-row justify-content-between dropdown-item">
            <label class="form-check-label text-wrap" :for="option[text_field]">{{ option[text_field] }}</label>
            <input class="form-check-input float-right" v-model="localValue" type="checkbox" :id="option[text_field]" :value="option[value_field]"/>
            </div>
        </li>
    </ul>
    </div>
</template>