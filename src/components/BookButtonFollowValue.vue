<script>
export default{
	name : "BookFollowValue",

	props : {
		name : String,
		value : Number,
		text : String
	},

	methods : {
		setSearchParam(param, newValue) {
            this.$store.commit("books/clearSearchParams");
            this.$store.commit("books/setSearchParam", { value: newValue, name: param });
            if (this.$route.path !== "/books") {
                this.$router.push("/books");
            }
        }
	},
}
</script>

<template>
	<a href @click.prevent="setSearchParam(name, [value])">{{ text }}</a>
</template>
