<script>
import BookShelf from "./BookShelf";
import InputDropdownSelectMultiple from "./InputDropdownSelectMultiple";
import DropdownSelect from "./InputDropdownSelect.vue";
import ButtonsPagination from "./ButtonsPagination.vue";
export default {
  name: "PageBooksSearch",

  components: {
    BookShelf,
    InputDropdownSelectMultiple,
    ButtonsPagination,
    DropdownSelect
  },

  data() {
    return {
      params: {
        perPage: 4,
      },
      paramOptions: {
        sort: [],
        categories: [],
        authors: []
      }
    }
  },

  computed: {
    selectedCategories: {
      get() {
        return this.$store.getters['books/getSearchParam']('categories');
      },
      set(value) {
        this.$store.commit("books/setSearchParam", { value, name: 'categories' });
      }
    },
    selectedAuthors: {
      get() {
        return this.$store.getters['books/getSearchParam']('authors');
      },
      set(value) {
        this.$store.commit("books/setSearchParam", { value, name: 'authors' });
      }
    },
    selectedSort : {
      get() {
        return this.$store.getters['books/getSearchParam']('sort');
      },
      set(value) {
        this.$store.commit("books/setSearchParam", { value, name: 'sort' });
      }
    },
    page: {
      get() {
        return this.$store.getters['books/getSearchParam']('page');
      },
      set(value) {
        this.$store.commit("books/setSearchParam", { value, name: 'page' });
      }
    },
    maximumPage: function () {
      return this.$store.getters['books/getSearchParam']("maximumPage");
    },
    Params: function () {
      let paramObject = { perPage: this.params.perPage, categories: this.selectedCategories, authors: this.selectedAuthors, page: this.page ?? 0, sortSelected: this.selectedSort };
      return paramObject;
    }
  },

  watch: {
    Params: {
      handler: async function (newValue, oldValue) {
        if (newValue.page == oldValue.page) {
          this.page = 1;
        }
        await this.getItems(newValue);
      },
      deep: true
    }
  },

  async created() {
    let bookResult = await this.getItems(this.Params);

    let [categoryResult, authorResult, sortResult] = await Promise.all([
      this.$store.dispatch("fetch", { url: 'category' }),
      this.$store.dispatch("fetch", { url: 'author' }),
      this.$store.dispatch("fetch", { url: 'book', params: { sortOptions: true } }),
    ])
    this.paramOptions.categories = categoryResult.data;
    this.paramOptions.authors = authorResult.data;
    this.paramOptions.sort = sortResult.data.body;

    this.items = bookResult;
  },

  methods: {
    async getItems(params) {
      let result = await this.$store.dispatch("books/fetch", { params, name: "SearchBooks" });

      let maximumPage = result.data.body.last_page;
      this.$store.commit("books/setSearchParam", { value: maximumPage, name: 'maximumPage' });
    }
  }
}
</script>
<template>
  <div class="mk-solo-page page container-fluid">
    <div class="row spec-row d-flex flex-row">
      <div id="filters">
        <div class="d-flex flex-column text-center">
          <label for="textSearch">Search by title</label>
          <input type="text" name="textSearch" class="form-text" id="textSearch">
        </div>
        <DropdownSelect options_text_field="text" label="Sort options" :options="paramOptions.sort" v-model="selectedSort" />
        <InputDropdownSelectMultiple name="Category" :options="paramOptions.categories" text_field="text"
          v-model="selectedCategories" />
        <InputDropdownSelectMultiple name="Author" :options="paramOptions.authors" text_field="full_name"
          v-model="selectedAuthors" />
        <a class="btn btn-dark w-100" id="resetFilterButton" href="#">Remove filters</a>
      </div>
      <div class="mk-holder" id="filter-holder">
        <div class="container-fluid">
          <div class="row">
            <h2 id="mk-book-category">Books</h2>
            <hr>
          </div>
          <div id="event-div" class="row mk-clear w-100">
            <BookShelf source="SearchBooks" />
          </div>
        </div>
        <ButtonsPagination v-model="page" :maximum_page="maximumPage" />
      </div>
    </div>
  </div>
</template>