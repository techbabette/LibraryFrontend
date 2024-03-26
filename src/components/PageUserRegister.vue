<script>
import InputForm from "@/components/InputForm.vue";
import axios from "@/axios/axios";
export default {
    name: "PageUserRegister",

    components: {
        InputForm
    },

    data() {
        return {
            inputs: {
                "name": {
                    label: "First name",
                    field_type: "string",
                    class: "col-6"
                },
                "last_name": {
                    label: "Last name",
                    field_type: "string",
                    class: "col-6"
                },
                "email": {
                    label: "Email",
                    field_type: "string",
                    class: "col-12"
                },
                "password": {
                    label: "Password",
                    field_type: "password",
                    class: "col-12"
                },
                "address": {
                    label: "Address",
                    field_type: "string",
                    class: "col-12"
                }
            },
            registrationData: {
            },
            errors: {

            }
        }
    },

    mounted() {
        this.$store.commit("navigation/changeFirstPageLoaded", true);
    },

    methods: {
        async attemptRegistration() {
            let result = await axios.post("auth/register", this.registrationData);
            if (result.success) {
                this.errors = {};
                this.$store.commit("messages/display", { text: "Check your email for a confirmation message", success: true });
                this.$router.push("/login");
            } else {
                this.errors = result.errors;
            }
        }
    }
}
</script>
<template>
    <div class="mk-solo-page page container-fluid">
        <div class="col-6">
            <h2>Become a member of the library</h2>
            <div>
                <InputForm :elements="inputs" v-model="registrationData" :errors="errors"
                    _class="d-flex flex-row flex-wrap" />
                <a href="" @click.prevent="attemptRegistration" class="btn btn-light w-100 bigButton my-2">Register</a>
            </div>
        </div>
    </div>
</template>