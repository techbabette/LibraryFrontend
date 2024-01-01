<template>
        <footer class="container-fluid mk-background">
      <div class="row w-100" >
        <div class="mk-logo col-6 flex" id="footer-title">
            <router-link to="/">©{{ currentYear }} <h2>Gradska biblioteka</h2></router-link>
        </div>
        <div class="col-6 flex  flex-md-row">
          <ul class="row align-items-center list-unstyled p-0">
            <li v-for="link, key in links" :key="key" class="col-md-3 col-6 icon-holder">
                <a class="text-light" :href="link.to" ><span class="iconify" :data-icon="link.text"></span></a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
</template>
<script>
export default {
  name: 'FooterBar',
  props: {
    links: Array
  },
  data(){
    return {
        currentYear : new Date().getFullYear()
    }
  }
}
</script>