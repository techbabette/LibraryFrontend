<template>
    <div>
        <router-link v-if="linkHasRoute" :to="{ 'name' : Link.to  }" class="nav-link" :class="{active : currentlyActiveRoute === Link.to}">
            <span v-if="linkHasIcon">
                <span class="iconify" :data-icon="Link.icon"></span>
            </span>
            <span v-else-if="linkHasText">
                {{Link.text}}
            </span>
        </router-link>
        <a v-else-if="linkHasUrl" :href="Link.to">
            <span v-if="linkHasIcon">
                <span class="iconify" :data-icon="Link.icon"></span>
            </span>
            <span v-else-if="linkHasText">
                {{Link.text}}
            </span>
        </a>
    </div>
</template>
<script>
export default{
    name : "SmartRouteLink",
    props : {
        Link : Object,
        ExtraClasses : String
    },
    computed : {
        linkHasIcon : function(){
            return (Object.hasOwn(this.Link, "icon") && this.Link.icon);
        },
        linkHasText : function(){
            return Object.hasOwn(this.Link, "text"); 
        },
        linkHasUrl : function(){
            let extensions = [".xml", ".pdf", ".txt"];
            let linkHasExtension = extensions.some((ext) => this.Link.to.endsWith(ext));
            return this.Link.to.startsWith("http") || linkHasExtension
        },
        linkHasRoute : function(){
            return !this.linkHasUrl;
        },
        currentlyActiveRoute : function(){
            return this.$store.getters.getCurrentlyActiveRoute
        }
    }
}
</script>