<script>
export default {
    name : "PageBookSingle",

    computed : {
        BookInformation : function(){
            return this.$store.getters.getViewedBookInfo;
        }
    },

    async mounted(){
         await this.$store.dispatch("getBookInformationById", this.$route.params.id); 
    }
}
</script>
<template>
  <div class="mk-solo-page page container-fluid flex-column">
      <div class="row" id="bookPage">
          <div class="col-12 col-lg-3">
            <div class="position-relative">
              <img :src="BookInformation.img" id="bookImage" class="card-img-top img-fluid image-zoom data-zoom" alt="Korica knjige">
            </div>
          </div>
          <div class="col-12 col-lg-9" id="bookInfo">
            <div class="w-100 mk-yellow">
              <h2 id="book-title">{{ BookInformation.name }}</h2>
          </div>
          <p id="book-description"> {{ BookInformation.description }}</p>
          <div>
            <div class="dynamic-field" id="author-field">
              <p>Author: {{ BookInformation.author.name }}</p> 
              <ul class="list-unstyled">
                <li>
                  <a id="author-link" href="#"></a>
                </li>
              </ul> 
            </div>
            <div class="dynamic-field" id="category-field">
              <p>Category: {{ BookInformation.category.name }}</p> 
              <ul class="list-unstyled">
                <li>
                  <a id="category-link" href="#"></a>
                </li>
              </ul> 
            </div> 
            <div class="dynamic-field" id="date-field">
              <p>Year of release: {{ BookInformation.releaseDate}}</p> 
              <ul class="list-unstyled">
                <li>
                  <a id="date-link" href="#"></a>
                </li>
              </ul> 
            </div>
            <div class="dynamic-field">
             <p id="availability-field">Number of available copies: {{ BookInformation.copies }}</p>
            </div>
            <div class="dynamic-field">
              <p id="loaned-field">Loaned {{ BookInformation.timeLoaned }} times</p>
            </div>
            </div>
          </div>
      </div>
  </div>
</template>