<template>
    <div class="mk-solo-page page container-fluid">
        <div class="row spec-row d-flex flex-row">
          <div id="filters">
            <div class="d-flex flex-column text-center">
              <label for="textSearch">Search by title</label>
              <input type="text" name="textSearch" class="form-text" id="textSearch">
            </div>
            <DropdownSelect optionsTextField="text" label="Sort options" :options="paramOptions.sort" v-model="params.sort"/>
            <InputDropdownSelectMultiple Name="Category" :options="paramOptions.categories" textField="text" v-model="SelectedCategories"/>
            <InputDropdownSelectMultiple Name="Author" :options="paramOptions.authors" textField="full_name" v-model="SelectedAuthors"/>
            <a class="btn btn-dark w-100" id="resetFilterButton" href="#">Remove filters</a>
            </div>
            <div class="mk-holder" id="filter-holder">
                <div class="container-fluid">
                  <div class="row">
                    <h2 id="mk-book-category">Books</h2>
                    <hr>
                  </div>
                    <div id="event-div" class="row mk-clear w-100">
                      <BookShelf Source="SearchBooks"/>
                    </div>
                  </div>
                  <ButtonsPagination v-model="params.page" :maximum_page="maximumPage"/>
            </div>
        </div>
    </div>
</template>
<script>
import BookShelf from "../BookShelf";
import InputDropdownSelectMultiple from "../InputDropdownSelectMultiple";
import DropdownSelect from "../InputDropdownSelect.vue";
import ButtonsPagination from "../ButtonsPagination.vue";
export default{
    name : "BooksPage",
    components : {
        BookShelf,
        InputDropdownSelectMultiple,
        ButtonsPagination,
        DropdownSelect
    },
    data(){
      return {
        params : {
          perPage : 4,
          sort : 0,
          page : 1
        },
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
        let paramObject = {perPage : this.params.perPage, categories : this.SelectedCategories, authors : this.SelectedAuthors, page : this.params.page, sortSelected : this.params.sort};
        return paramObject;
      },
      maximumPage : function(){
        return this.$store.getters.getSearchParam("maximumPage");
      }
    },
    async created(){
      let bookResult = await this.getItems(this.Params);
      
      let [categoryResult, authorResult, sortResult] = await Promise.all([
        this.$store.dispatch("fetch", {url : 'category'}),
        this.$store.dispatch("fetch", {url : 'author'}),
        this.$store.dispatch("fetch", {url : 'book', params : {sortOptions : true}}),
      ])
      this.paramOptions.categories = categoryResult.data;
      this.paramOptions.authors = authorResult.data;
      this.paramOptions.sort = sortResult.data.body;

      this.items = bookResult;
    },
    watch : {
      Params : {
        handler : async function(newValue, oldValue){
          if(newValue.page == oldValue.page){
            this.params.page = 1;
          }
          await this.getItems(newValue);
        },
        deep : true
      }
    },
    methods : {
      async getItems(params){
        let result = await this.$store.dispatch("fetchBooks", {params, name : "SearchBooks"});

        let maximumPage = result.data.body.last_page;
        this.$store.commit("setSearchParam", {value : maximumPage, name : 'maximumPage'});
      }
    }
}
</script>