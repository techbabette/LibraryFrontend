<template>
    <button class="btn admin-tab" :class="{ 'PrimaryButton': !isCurrentlyActive, 'PrimaryButtonActive': isCurrentlyActive }">
        {{ Title }}
    </button>
</template>
<script>
export default {
    name: "AdminTableTab",
    props: {
        Title: {
            Type: String,
            require: true
        },
        isCurrentlyActive: {
            Type : Boolean,
            require : true
        }
    }
}
</script>
<style scoped>
.admin-tab {
    border-radius: 15px 2px 2px 2px;
    margin-right: 2px;
}
.PrimaryButton{
    border: 1px solid black;
}
.PrimaryButtonActive{
    border: 2px solid black;
}
</style>