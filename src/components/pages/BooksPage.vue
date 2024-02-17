<template>
    <div class="mk-solo-page page container-fluid">
        <div class="row spec-row d-flex flex-row">
          <div id="filters">
            <div class="d-flex flex-column text-center">
              <label for="textSearch">Search by title</label>
              <input type="text" name="textSearch" class="form-text" id="textSearch">
            </div>
            <div class="dropdown">

              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Sort options
              </button>
              <ul class="dropdown-menu" id="sortHolder" aria-labelledby="dropdownMenuButton1">
              </ul>
              <AdaptableInput fieldType="select" optionsTextField="text" :options="paramOptions.sort"/>
            </div>
            <SearchSelectionDropdown Name="Category" :options="paramOptions.categories" textField="text" v-model="SelectedCategories"/>
            <SearchSelectionDropdown Name="Author" :options="paramOptions.authors" textField="full_name" v-model="SelectedAuthors"/>
            <a class="btn btn-dark w-100" id="resetFilterButton" href="#">Remove filters</a>
            </div>
            <div class="mk-holder" id="filter-holder">
                <div class="container-fluid">
                  <div class="row">
                    <h2 id="mk-book-category">Books</h2>
                    <hr>
                  </div>
                    <div id="event-div" class="row mk-clear w-100">
                      <BookShelf Source="SearchBooks" :queryParams="Params"/>
                    </div>
                  </div>
                  <pageButtons v-model="params.page" :MaximumPage="maximumPage"/>
            </div>
        </div>
    </div>
</template>
<script>
import BookShelf from "../bookComponents/BookShelf";
import SearchSelectionDropdown from "../inputs/SearchSelectionDropdown";
import AdaptableInput from "../inputs/AdaptableInput.vue";
import pageButtons from "../inputs/pageButtons";
export default{
    name : "BooksPage",
    components : {
        BookShelf,
        SearchSelectionDropdown,
        pageButtons,
        AdaptableInput
    },
    data(){
      return {
        params : {
          perPage : 4,
          categories : [],
          authors : [],
          sort : 0,
          page : 1
        },
        maximumPage : 1,
        paramOptions : {
          sort : [],
          categories : [],
          authors : []
        }
      }
    },
    computed : {
      SelectedCategories : {
          get(){
            return this.$store.getters.getSearchParam('categories');
          },
          set(value){
            this.$store.commit("setSearchParam", {value, name : 'categories'});
          }
      },
      SelectedAuthors : {
          get(){
              return this.$store.getters.getSearchParam('authors');
          },
          set(value){
              this.$store.commit("setSearchParam", {value, name : 'authors'});
          }
      },
      Params : function(){
        let paramObject = {perPage : this.params.perPage, categories : this.SelectedCategories, authors : this.SelectedAuthors, page : this.params.page};
        return paramObject;
      }
    },
    async mounted(){
      this.paramOptions.categories = (await this.$store.dispatch("fetch", {url : 'category'})).data;
      this.paramOptions.authors = (await this.$store.dispatch("fetch", {url : 'author'})).data;
      this.paramOptions.sort = (await this.$store.dispatch("fetch", {url : 'book', params : {sortOptions : true}})).data.body;

      this.items = this.getItems(this.Params);
    },
    watch : {
      Params : {
        handler : async function(newValue){
          this.getItems(newValue);
        },
        deep : true
      }
    },
    methods : {
      async getItems(params){
        let result = await this.$store.dispatch("fetchBooks", {params, name : "SearchBooks"});

        this.maximumPage = result.data.body.last_page;
      }
    }
}
</script>