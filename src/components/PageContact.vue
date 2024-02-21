<script>
import InputAdaptable from "@/components/InputAdaptable.vue";
import axios from "@/axios/axios";
export default {
    name : "PageContact",

    components : {
        InputAdaptable
    },

    data(){
        return {
            message : {
                title : "",
                body : "",
                message_type_id : -1
            },
            messageTypes : []
        }
    },

    mounted(){
        this.getMessageTypes();
    },

    methods : {
        getMessageTypes : async function(){
            let result = await axios.get("messagetype");
            this.messageTypes = result.data;
        },
        sendMessage : async function(){
            let result = await axios.post("message", this.message);

            if(result.success){
                this.$store.commit("messages/display", {text : "Successfully sent message!", success : true});
            }
        }
    }
}
</script>

<template>
    <div class="mk-solo-page page container-fluid">
        <div class="col-6">
            <h2>Send a message to the administration team</h2>
                <InputAdaptable v-model="message.title" field_type="string" label="Title"/>
                <InputAdaptable v-model="message.message_type_id" field_type="select" label="Message type" :options="messageTypes"/>
                <InputAdaptable v-model="message.body" field_type="text" label="Text"/>
            <a href="" @click.prevent="sendMessage" class="btn btn-light w-100 bigButton my-2">Send</a>
        </div>
    </div>
</template>