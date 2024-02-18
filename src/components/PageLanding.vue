<script>
import InfoBlock from "./InfoBlock.vue";
import BookShelf from "./BookShelf.vue";
export default {
  name: 'PageLanding',

  components : {
    InfoBlock,
    BookShelf
  },

  data(){
    return {
      InfoBlocks : [
        {
          title : "Members",
          maxValue : 150
        },
        {
          title : "Years since founding",
          maxValue : new Date().getFullYear() - 1930
        },
        {
          title : "Titles",
          maxValue : 0
        },
        {
          title : "Lent books",
          maxValue : 250
        }
      ],
    }
  },

  async mounted(){
    let blockWithTitle = (title) => this.InfoBlocks.filter((block) => block.title === title)[0];

    blockWithTitle("Titles").maxValue = (await this.$store.dispatch("fetch", {url : "/book", params : {onlyCount : true}})).data.body; 
  }

}
</script>
<template>
  <div>
  <div id="errorModal" class="mk-modal">
    <div class="mk-modal-content">
      <p id="error-content">Generička greška</p>
    </div>
  </div>
  <!--First page-->
  <div id="landing-page" class="mk-page page container-fluid ">
      <div class="row mk-clear">
          <div class="col-12">
            <div class="mk-introduction d-flex flex-column justify-content-center">
              <h2>Welcome to the City Library</h2>
              <p class="w-100 mk-quote">Home of knowledge</p>
            </div>
          </div>
        </div>
  </div>
  <!--Second page-->
  <div class="mk-page page container-fluid">
    <div class="row">
      <div class="col-12 container-fluid">
              <div class="row mk-sorted-book-holder mk-clear">
                <div class="row">
                  <h2 id="mk-book-category">Recent additions</h2>
                  <hr/>
                </div>
                <BookShelf source="NewestBooks" mount_action="fetchBooks" :query_params="{perPage : 4}"/>
            </div>
          </div>
    </div>
  </div>
  <!--Third page-->
  <div class="mk-part-page page p-0 container-fluid">
    <div class="row w-100 h-100">
      <div class="col-12 col-md-6 container-fluid" id="lib-desc">
        <h2>Short history</h2>
        <p id="libHist">The decision to found the library was made on the 24th of october, 1930. Two years later Marija Ilić Agapova became head librarian.</p>
      </div>
      <div class="col-12 col-md-6 container-fluid" style="background-color: blue; padding: 0px;">
        <div class="row w-100 info-holder  mk-clear">
          <InfoBlock v-for="block, key in InfoBlocks" :key="key" :title="block.title" :max_value="block.maxValue" :time_to_load="2500"/>
        </div>
      </div>
    </div>
  </div>
  <!--Fourth page-->
  <div class="mk-page page container-fluid">
    <div class="row w-100">
      <div class="col-12 container-fluid w-100">
              <div class="row mk-sorted-book-holder mk-clear">
                <div class="col-1 mk-flex-column-center"><a href="#" class="moveButton" id="moveLeftButton">&lArr;</a></div>
                <div class="container-fluid  col-12 col-md-10">
                  <div class="row">
                    <h2 id="mk-book-category">Most popular books</h2>
                    <hr/>
                  </div>
                  <div class="row" id="pop">
                  </div>
                </div>
                <div class="col-1 mk-flex-column-center"><a href="#" class="moveButton" id="moveRightButton">&rArr;</a></div>
            </div>
          </div>
      </div>
  </div>
  <!--Footer-->
  </div>
</template>