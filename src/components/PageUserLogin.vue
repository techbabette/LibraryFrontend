<script>
import InputAdaptable from "@/components/InputAdaptable.vue";
import axios from "@/axios/axios";
export default {
    name: "PageUserLogin",

    components: {
        InputAdaptable
    },

    data() {
        return {
            loginData: {
                email: "ilija.krstic.155.21@ict.edu.rs",
                password: "password"
            }
        }
    },

    async mounted() {
        let queryOptions = this.$route.query;
        let user = queryOptions.user;
        let token = queryOptions.token;

        if (user && token) {
            let result = await axios.get(`/auth/verify/${user}/${token}`);

            if (result.success) {
                this.$store.commit("user/changeToken", result.body);
                this.$store.commit("messages/display", { text: "Successfully activated account", success: true });
                this.$router.push("/").catch(() => { });
            } else {
                this.$store.commit("navigation/changeFirstPageLoaded", true);
            }
        } else {
            this.$store.commit("navigation/changeFirstPageLoaded", true);
        }
    },

    methods: {
        async attemptLogin() {
            let body = this.loginData;
            await this.$store.dispatch("user/attemptLogin", body);
        }
    },
}
</script>
<template>
    <div class="mk-solo-page page container-fluid">
        <div class="col-6">
            <h2>Login to your City Library account</h2>
            <InputAdaptable v-model="loginData.email" field_type="string" label="Email" />
            <InputAdaptable v-model="loginData.password" field_type="password" label="Password" />
            <a href="" @click.prevent="attemptLogin" class="btn btn-light w-100 bigButton my-2">Login</a>
        </div>
    </div>
</template>