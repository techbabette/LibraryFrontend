export default {
    inserted: function(el, binding, vnode) {
        let userRole = vnode.context.$store.getters.activeUserRole

        let allowedRoles = binding.value;

        if(!allowedRoles.includes(userRole)) {
            vnode.elm.classList.add("d-none");
        }
        else{
            vnode.elm.classList.remove("d-none");
        }
    },
    update: function(el, binding, vnode) {
        let userRole = vnode.context.$store.getters.activeUserRole

        let allowedRoles = binding.value;

        if(!allowedRoles.includes(userRole)) {
            vnode.elm.classList.add("d-none");
        }
        else{
            vnode.elm.classList.remove("d-none");
        }
    }
}