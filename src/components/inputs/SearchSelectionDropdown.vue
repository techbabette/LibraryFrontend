<template>
    <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
        {{Name}}
    </button>
    <ul class="dropdown-menu" id="categoryHolder" aria-labelledby="dropdownMenuButton1">
        <li v-for="option, key in options" :key="key">
            <div  class="d-flex flex-row justify-content-between dropdown-item">
            <label class="form-check-label text-wrap" :for="option[textField]">{{ option[textField] }}</label>
            <input class="form-check-input float-right" v-model="localValue" type="checkbox" :id="option[textField]" :value="option[valueField]"/>
            </div>
        </li>
    </ul>
    </div>
</template>
<script>
export default {
    name : "SelectionDropdown",
    props : {
        Name : String,
        options : Array,
        textField : {
            default : 'name',
            type : String
        },
        valueField : {
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
    mounted() {
       this.localValue = this.value
    },
    watch: {
       localValue: function() {
           this.$emit("input", this.localValue)
       },
       value: function() {
           this.localValue = this.value
       }
   }
}
</script>