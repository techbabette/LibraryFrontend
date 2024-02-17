<template>
    <div class="mk-solo-page page container-fluid">
        <div class="col-6">
            <h2>Login to your City Library account</h2>
                <AdaptableInput v-model="loginData.email" fieldType="string" label="Email"/>
                <AdaptableInput v-model="loginData.password" fieldType="password" label="Password"/>
            <a href="" @click.prevent="attemptLogin" class="btn btn-light w-100 bigButton my-2">Login</a>
        </div>
    </div>
</template>
<script>
import AdaptableInput from "@/components/InputAdaptable.vue";
export default {
    name : "LoginPage",
    components : {
        AdaptableInput
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
            let response = await this.$store.dispatch("attemptLogin", body);

            if(response.success){
                this.$router.push("/");
            }
        }
    }
}
</script>