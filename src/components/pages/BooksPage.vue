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
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                Category
              </button>
              <ul class="dropdown-menu" id="categoryHolder" aria-labelledby="dropdownMenuButton1">
                <li v-for="cat, key in Categories" :key="key">
                    <div  class="d-flex flex-row justify-content-between dropdown-item">
                    <label class="form-check-label text-wrap" :for="cat.name">{{ cat.name }}</label>
                    <input class="form-check-input float-right" v-model="SelectedCategories" type="checkbox" :id="cat.name" :value="cat.id"/>
                    </div>
                </li>
              </ul>
            </div>
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
                  <p id="loadMore"></p>
            </div>
        </div>
    </div>
</template>
<script>
import BookShelf from "../bookComponents/BookShelf";
export default{
    name : "BooksPage",
    components : {
        BookShelf
    },
    computed : {
        Categories : function(){
            return this.$store.getters.getCategoryOptions
        },
        SelectedCategories : {
            get () {
                return this.$store.getters.getSelectedCategories
            },
            set (categories) {
                console.log(categories);
                this.$store.commit("setSelectedCategories", categories)
            }
        }
    }
}
</script>