<script>
export default {
    name : "DropdownSelect",

    props: {
        value : {
            type: [String, Number]
        },
        label : {
            type: String,
            required: false
        },
        name : {
            type: String,
            default: "field"
        },
        hint : {
            Type : String
        },
        errorMessage : {
            Type : String
        },
        options : {
            type: Array,
            required : false
        },
        optionsValueField : {
            type: String,
            default: "id"
        },
        optionsTextField : {
            type: String,
            default: "name"
        },
        checkOnBlur : {
            Type : Boolean,
            default : true
        }
    },

    data(){
        return {
            localValue : this.value,
            id : Math.floor(Math.random() * 1000) + this.name
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

   methods : {
        setValueToSelf(newValue){
            this.localValue = newValue;
        }
   }
}
</script>
<template>
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" :id="id" data-bs-toggle="dropdown" aria-expanded="false">
          {{ label }}
        </button>
        <ul class="dropdown-menu" :aria-labelledby="id">
            <div v-for="option, key of options" :key="key" class="d-flex flex-row justify-content-between dropdown-item">
                <a :id="option[optionsValueField]" class="w-100" :class="{active : localValue === option[optionsValueField]}"
                 href="#" @click.prevent="setValueToSelf(option[optionsValueField])"> {{ option[optionsTextField] }}</a>
            </div>
        </ul>
    </div>
</template>