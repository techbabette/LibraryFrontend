<script>
import BookButtonFollowValue from './BookButtonFollowValue.vue'
export default {
    name : "PageBookSingle",

    components: {
      BookButtonFollowValue
    },

    data(){
      return {
        bookInformation : {

        }
      };
    },

    computed: {
      bookReady : function(){
        return Object.keys(this.bookInformation).length > 0;
      }
    },

    async mounted(){
         this.bookInformation = (await this.$store.dispatch("fetch", {url : `/book/${this.$route.params.id}`})).body;
    },
    
    methods: {
      imgSource : function (img){
            return require('@/assets/imgs/'+img)
        }
    }
}
</script>
<template>
  <div class="mk-solo-page page container-fluid flex-column">
      <div v-if="bookReady" class="row" id="bookPage">
          <div class="col-12 col-lg-3">
            <div class="position-relative">
              <img :src="imgSource(bookInformation.img)" id="bookImage" class="card-img-top img-fluid image-zoom data-zoom" alt="Korica knjige">
            </div>
          </div>
          <div class="col-12 col-lg-9" id="bookInfo">
            <div class="w-100 mk-yellow">
              <h2 id="book-title">{{ bookInformation.name }}</h2>
          </div>
          <p id="book-description"> {{ bookInformation.description }}</p>
          <div>
            <div class="dynamic-field" id="author-field">
              <p>Author: 
                <BookButtonFollowValue :text='bookInformation.author.name + " " + bookInformation.author.last_name' :value="bookInformation.author.id" name="authors"/>
              </p> 
              <ul class="list-unstyled">
                <li>
                  <a id="author-link" href="#"></a>
                </li>
              </ul> 
            </div>
            <div class="dynamic-field" id="category-field">
              <p>Category:
                 <BookButtonFollowValue :text="bookInformation.category.text" :value="bookInformation.category.id" name="categories"/>
              </p> 
              <ul class="list-unstyled">
                <li>
                  <a id="category-link" href="#"></a>
                </li>
              </ul> 
            </div> 
            <div class="dynamic-field">
             <p id="availability-field">Number of available copies: {{ bookInformation.currently_available }}</p>
            </div>
            <div class="dynamic-field">
              <p id="loaned-field">Loaned {{ bookInformation.total_loans }} times</p>
            </div>
            </div>
          </div>
      </div>
  </div>
</template>