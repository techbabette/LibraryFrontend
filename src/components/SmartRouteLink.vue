<template>
        <router-link v-if="linkHasRoute" :to="Link.to" class="nav-link" :class="{active : currentlyActiveRoute === Link.to}">
            <p v-if="linkHasIcon">
                <span class="iconify" :data-icon="Link.icon"></span>
            </p>
            <span v-if="linkHasText">
                {{Link.text}}
            </span>
        </router-link>
        <a v-else-if="linkHasUrl" :href="Link.url">
            <p v-if="linkHasIcon">
                <span class="iconify" :data-icon="Link.icon"></span>
            </p>
            <span v-if="linkHasText">
                {{Link.text}}
            </span>
        </a>
</template>
<script>
export default{
    name : "SmartRouteLink",
    props : {
        Link : Object
    },
    computed : {
        linkHasIcon : function(){
            return Object.hasOwn(this.Link, "icon");
        },
        linkHasText : function(){
            return Object.hasOwn(this.Link, "text"); 
        },
        linkHasRoute : function(){
            return Object.hasOwn(this.Link, "to");
        },
        linkHasUrl : function(){
            return Object.hasOwn(this.Link, "url");
        },
        currentlyActiveRoute : function(){
            return this.$store.getters.getCurrentlyActiveRoute
        }
    }
}
</script>