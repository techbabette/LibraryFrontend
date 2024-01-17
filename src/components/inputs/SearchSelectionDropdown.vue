<template>
    <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
        {{Name}}
    </button>
    <ul class="dropdown-menu" id="categoryHolder" aria-labelledby="dropdownMenuButton1">
        <li v-for="option, key in options" :key="key">
            <div  class="d-flex flex-row justify-content-between dropdown-item">
            <label class="form-check-label text-wrap" :for="option.name">{{ option.name }}</label>
            <input class="form-check-input float-right" v-model="selectedOptions" type="checkbox" :id="option.name" :value="option.id"/>
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
        ValueName : String
    },
    computed : {
        options : function(){
            return this.$store.getters["get" + this.Name + "Options"];
        },
        selectedOptions : {
            get () {
                return this.$store.getters["getSelected" + this.ValueName];
            },
            set (value) {
                this.$store.commit("setSelected" + this.ValueName,value)
            }
        }
    }
}
</script>