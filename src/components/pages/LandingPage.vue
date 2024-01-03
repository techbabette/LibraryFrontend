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
                <h2>Dobrodošli u gradsku biblioteku</h2>
                <p class="w-100 mk-quote">Dom znanja</p>
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
                    <h2 id="mk-book-category">Najnovije knjige</h2>
                    <hr/>
                  </div>
                  <div id="newestBooks" class="container-fluid col-12">
                    <div class="row" id="rec">
                    </div>
                  </div>
              </div>
            </div>
      </div>
    </div>
    <!--Third page-->
    <div class="mk-part-page page p-0 container-fluid">
      <div class="row w-100 h-100">
        <div class="col-12 col-md-6 container-fluid" id="lib-desc">
          <h2>Kratka istorija</h2>
          <p id="libHist">Odluka da se, za potrebe grada, osnuju opštinska biblioteka i muzej doneta je 24. oktobra 1930. godine. Na mesto bibliotekara je postavljena dr Marija Ilić Agapova, koja je dve godine kasnije, 30. septembra 1932. godine, postavljena za bibliotekara-upravnika.</p>
        </div>
        <div class="col-12 col-md-6 container-fluid" style="background-color: blue; padding: 0px;">
          <div class="row w-100 info-holder  mk-clear">
            <InfoBlock v-for="block, key in InfoBlocks" :key="key" :title="block.title" :maxValue="block.maxValue" :timeToLoad="2500"/>
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
                      <h2 id="mk-book-category">Najpopularnije knjige</h2>
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
<script>
import InfoBlock from "../InfoBlock.vue";

export default {
  name: 'LandingPage',
  components : {
    InfoBlock
  },
  data(){
    return {
      InfoBlocks : [
        {
          title : "Članova",
          maxValue : 150
        },
        {
          title : "Godine postojanja",
          maxValue : new Date().getFullYear() - 1930
        },
        {
          title : "Naslova",
          maxValue : 50
        },
        {
          title : "Izdatih knjiga",
          maxValue : 250
        }
      ]
    }
  }
}
</script>
