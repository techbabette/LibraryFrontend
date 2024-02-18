<script>
export default{
    name : "SmartRouteLink",

    props : {
        link : Object,
    },

    computed : {
        linkHasIcon : function(){
            return (Object.hasOwn(this.link, "icon") && this.link.icon);
        },
        linkHasText : function(){
            return Object.hasOwn(this.link, "text"); 
        },
        linkHasUrl : function(){
            let extensions = [".xml", ".pdf", ".txt"];
            let linkHasExtension = extensions.some((ext) => this.link.to.endsWith(ext));
            return this.link.to.startsWith("http") || linkHasExtension
        },
        linkHasRoute : function(){
            return !this.linkHasUrl;
        },
        currentlyActiveRoute : function(){
            return this.$store.getters['navigation/activeRoute'];
        }
    }
}
</script>
<template>
    <div>
        <router-link v-if="linkHasRoute" :to="{ 'name' : link.to  }" class="nav-link" :class="{active : currentlyActiveRoute === link.to}">
            <span v-if="linkHasIcon">
                <span class="iconify" :data-icon="link.icon"></span>
            </span>
            <span v-else-if="linkHasText">
                {{link.text}}
            </span>
        </router-link>
        <a v-else-if="linkHasUrl" :href="link.to">
            <span v-if="linkHasIcon">
                <span class="iconify" :data-icon="link.icon"></span>
            </span>
            <span v-else-if="linkHasText">
                {{link.text}}
            </span>
        </a>
    </div>
</template>