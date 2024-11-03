<script>
export default {
    name: "PageLoading",

    computed: {
        online: function () {
            if (!this.$store.getters['navigation/error']) {
                return true;
            }

            else {
                return false;
            }
        },
        message: function () {
            if(this.online){
                return "City Library";
            }
            else{
                return "The City Library is currently offline";
            }
        }
    }
}
</script>

<template>
    <div id="loading-holder" class="mk-flex-column-center">
        <h1 class="mk-yellow">{{ message }}</h1>
        <div v-if='online' class="spinner my-2">
            <div class="mask">
                <div class="maskedCircle"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#loading-holder {
    min-height: 100vh;
    min-width: 100vw;
    background-color: #333333;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

/* Spinning circle (inner circle) */
.maskedCircle {
    width: 20px;
    height: 20px;
    border-radius: 12px;
    border: 3px solid white;
}

/* Spinning circle mask */
.mask {
    width: 12px;
    height: 12px;
    overflow: hidden;
}

/* Spinner */
.spinner {
    width: 36px;
    height: 36px;
    animation: spin 1s infinite linear;
}
</style>