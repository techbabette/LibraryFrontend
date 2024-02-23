<script>
import InputForm from "@/components/InputForm.vue";
export default {
    name : "PageUserRegister",

    components : {
        InputForm
    },

    data(){
        return {
            inputs : {
                "name" : {
                    label : "First name",
                    field_type : "string",
                    class : "col-6"
                    },
                "last_name" : {
                    label : "Last name",
                    field_type : "string",
                    class : "col-6"
                },
                "email" : {
                    label : "Email",
                    field_type : "string",
                    class : "col-12"
                },
                "password" : {
                    label : "Password",
                    field_type : "password",
                    class : "col-12"
                },
                "address" : {
                    label : "Address",
                    field_type : "string",
                    class : "col-12"
                }
            },
            registrationData : {
            }
        }
    },

    methods : {
        async attemptRegistration(){
            let body = this.registrationData;
            await this.$store.dispatch("user/attemptRegistration", body);
        }
    }
}
</script>
<template>
    <div class="mk-solo-page page container-fluid">
        <div class="col-6">
            <h2>Become a member of the library</h2>
            <div>
                <InputForm :elements="inputs" v-model="registrationData" _class="d-flex flex-row flex-wrap"/>
                <a href="" @click.prevent="attemptRegistration" class="btn btn-light w-100 bigButton my-2">Register</a>
            </div>
        </div>
    </div>
</template>