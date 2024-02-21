<script>
import InputAdaptable from "@/components/InputAdaptable.vue" 
import getParam from "@/lib/getParam";
import handleParamRequest from "@/lib/paramRequest";
export default {
    name : "InputForm",

    components : {
        InputAdaptable
    },

    props : {
        elements : {
            Type : Object,
            default : () => {}
        },
        value : {
            Type : Object
        }
    },

    data(){
        return {
            formValue : {},
            formSources : {}
        }
    },

    watch: {
        localValue: function () {
            this.$emit("input", this.formValue)
        },
        value: function () {
            this.formValue = this.value
        }
    },

    mounted(){
        console.log(Object.keys(this.elements));
        this.formValue = this.value;
        this.loadSources();
    },

    methods : {
        loadSources : async function(){
            for(let key of Object.keys(this.elements)){
                let currentElement = this.elements[key];

                let usesSource = Object.hasOwn(currentElement, "source");

                console.log(currentElement);

                if(!usesSource){
                    continue;
                }

                let sourceLocal = getParam(currentElement['source'], 'sourceLocal');

                if(sourceLocal){
                    continue;
                }

                let response = await handleParamRequest(currentElement['source']);

                let items = response.body;

                console.log(items);


                this.$set(this.formSources, key, items);
            }
        },
        elementSource : function(key){
            let element = this.elements[key]
            let sourceLocal = getParam(element['source'], 'sourceLocal');

            if(sourceLocal){
                return sourceLocal;
            }

            return key;
        }
    }
}
</script>

<template>
    <div>
        <InputAdaptable :class="elements[inputBind].class" v-for="inputBind, index of Object.keys(elements)" 
        :key="index + 'a'" :field_type="elements[inputBind].field_type" :label="elements[inputBind].label" :options="formSources[elementSource(inputBind)]"
        v-model="formValue[inputBind]"/>
    </div>
</template>