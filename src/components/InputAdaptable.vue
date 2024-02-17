<template>
    <div class="form-group">
        <label v-if="label" :for="id" class="form-label">{{ label }}</label>
        <input v-if="fieldType == 'string'" v-model="localValue" 
        :name="name" :id="id" type="text" class="form-control" @blur="emitNameOnBlur">
        <input v-if="fieldType == 'password'" v-model="localValue" 
        :name="name" :id="id" type="password" class="form-control" @blur="emitNameOnBlur">
        <input v-if="fieldType == 'number'" v-model="localValue" 
        :name="name" :id="id" type="number" class="form-control" @blur="emitNameOnBlur">
        <select v-if="fieldType == 'select'" v-model="localValue" :name="name" :id="id" class="col-12">
            <option v-for="option in options" :key="option[optionsValueField]" :value="option[optionsValueField]">
                {{makeUpperCase(option[optionsTextField])}}
            </option>
        </select>
        <p v-if="errorMessage" class="alert alert-danger py-2 my-1">{{ errorMessage }}</p>
        <p v-if="ShowHint">{{ hint }}</p>
    </div>
</template>
<script>
export default {
  name: 'AdaptableInput',
  data(){
    return {
        localValue : undefined,
        id : Math.floor(Math.random() * 1000) + this.name
    }
  },
  mounted() {
       this.localValue = this.value
  },
  props: {
    value : {
        type: [String, Number, Array]
    },
    fieldType : {
        type: String,
        default: "string" 
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
  methods: {
        makeUpperCase(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        emitName(){
            this.$emit("blur", this.name);
        },
        emitNameOnBlur(){
            if(!this.checkOnBlur){
                return;
            }

            this.emitName();
        }
   },
   computed : {
        ShowHint(){
            return this.hint && !this.errorMessage;
        }
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