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
            </div>
            <SearchSelectionDropdown Name="Category" ValueName="Categories"/>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                Author
              </button>
              <ul class="dropdown-menu" id="authorHolder" aria-labelledby="dropdownMenuButton2">
              </ul>
            </div>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                Year of release
              </button>
              <ul class="dropdown-menu" id="yearHolder" aria-labelledby="dropdownMenuButton1">
              </ul>
            </div>
            <a class="btn btn-dark w-100" id="resetFilterButton" href="#">Remove filters</a>
            </div>
            <div class="mk-holder" id="filter-holder">
                <div class="container-fluid">
                  <div class="row">
                    <h2 id="mk-book-category">Books</h2>
                    <hr>
                  </div>
                    <div id="event-div" class="row mk-clear w-100">
                      <BookShelf Source="NewestBooks"/>
                    </div>
                  </div>
                  <pageButtons v-model="CurrentPage" :MaximumPage="MaximumPage"/>
            </div>
        </div>
    </div>
</template>
<script>
import BookShelf from "../bookComponents/BookShelf";
import SearchSelectionDropdown from "../inputs/SearchSelectionDropdown";
import pageButtons from "../inputs/pageButtons";
export default{
    name : "BooksPage",
    components : {
        BookShelf,
        SearchSelectionDropdown,
        pageButtons
    },
    computed : {
        CurrentPage : {
            get(){
                return this.$store.getters.getCurrentSearchPage
            },
            set(value){
                this.$store.commit("setSearchPage", value);
            }
        },
        MaximumPage : function(){
            return this.$store.getters.getAvailableSearchPages
        },
    }
}
</script>