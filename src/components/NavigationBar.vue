<template>
    <header class="container-fluid">
        <div class="row">
            <nav class="navbar navbar-expand-lg navbar-dark mk-background">
                <div class="container-fluid" id="actual-navbar">
                    <router-link to="/" class="navbar-brand" id="Gradska_biblioteka" href="index.html"><h1 class="h4">Gradska biblioteka</h1></router-link>
                    <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                       <span class="navbar-toggler-icon"></span>
                   </button>
                <div class="navbar-collapse collapse" id="navbarSupportedContent" style="">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li v-for="link, key in links" :key="key" class="nav-item">
                            <router-link :to="link.to" class="nav-link">
                                {{link.text}}
                            </router-link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    </header>
</template>
<script>
export default {
  name: 'NavigationBar',
  props: {
    links: Array
  }
}
</script>