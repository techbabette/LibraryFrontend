<script>
import InputAdaptable from "@/components/InputAdaptable.vue";
export default {
    name : "PageUserLogin",

    components : {
        InputAdaptable
    },

    data(){
        return {
            loginData : {
                email : "email@gmail.com",
                password : "password"
            }
        }
    },

    methods : {
        async attemptLogin(){
            let body = this.loginData;
            let response = await this.$store.dispatch("user/attemptLogin", body);

            if(response.success){
                this.$router.push("/");
            }
        }
    }
}
</script>
<template>
    <div class="mk-solo-page page container-fluid">
        <div class="col-6">
            <h2>Login to your City Library account</h2>
                <InputAdaptable v-model="loginData.email" field_type="string" label="Email"/>
                <InputAdaptable v-model="loginData.password" field_type="password" label="Password"/>
            <a href="" @click.prevent="attemptLogin" class="btn btn-light w-100 bigButton my-2">Login</a>
        </div>
    </div>
</template>