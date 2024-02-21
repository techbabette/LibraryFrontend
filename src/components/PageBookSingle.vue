<script>
import axios from "@/axios/axios";
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
      },
      loanedToUser(){
        return this.bookInformation.loan_id ? true : false;
      },
      loanButtonText : function(){
        return this.loanedToUser ? "Return book" : "Borrow book";
      }
    },

    async mounted(){
      this.updateBookInfo();
    },

    methods: {
      imgSource : function (img){
        return require('@/assets/imgs/'+img)
      },
      loanOut : async function (){
        if(this.bookInformation.currently_available < 1){
            this.$store.commit("messages/display", {text : "Zero copies available", success : false})
            return;
        }
        let result = await (axios.post('/loan', {book_id : this.bookInformation.id}));  
        
        if(result.success){
          this.$store.commit("messages/display", {text : result.message, success : true})
          this.bookInformation.loan_id = result.body.loan_id;
          this.updateBookInfo();
        }
      },
      returnBook : async function (){
        let result = await (axios.patch(`/loan/return/${this.bookInformation.loan_id}`));  
        
        if(result.success){
          this.$store.commit("messages/display", {text : result.message, success : true})
          this.updateBookInfo();
        }
      },
      handleLoanButtonClick : async function (){
        if(this.loanedToUser){
          await this.returnBook();  
        }else{
          await this.loanOut();
        }
      },
      updateBookInfo : async function (){
        this.bookInformation = (await this.$store.dispatch("fetch", {url : `/book/${this.$route.params.id}`})).body;
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
            </div>
            <div class="dynamic-field" id="category-field">
              <p>Category:
                 <BookButtonFollowValue :text="bookInformation.category.text" :value="bookInformation.category.id" name="categories"/>
              </p> 
            </div> 
            <div class="dynamic-field">
              <p id="loaned-field">Loaned {{ bookInformation.total_loans }} times</p>
            </div>
            <div class="dynamic-field">
             <p id="availability-field">Number of available copies: {{ Math.max(bookInformation.currently_available, 0) }}</p>
            </div>
            <a class="btn bigButton btn-light w-50" @click.prevent="handleLoanButtonClick">{{ loanButtonText }}</a>
            </div>
          </div>
      </div>
  </div>
</template>