<template>
    <p v-if="ShowPageButtons" id="pageButtonsHolder">
        <button @click="changePage(button)" :key="key" v-for="button, key in pageButtons"
            :class="{ active: button === currentPage }">
            {{ button }}
        </button>
    </p>
</template>
<script>
export default {
    name: "PageButtons",

    props: {
        value: {
            Type: Number,
        },
        maximum_page: Number
    },

    data() {
        return {
            currentPage: 1
        }
    },

    computed: {
        ShowPageButtons: function () {
            return this.maximum_page > 1;
        },
        pageButtons: function () {
            let pageButtonsToShow = [];
            if (this.currentPage === 1) {
                let seoondPage = this.currentPage + 1;
                pageButtonsToShow = [this.currentPage, seoondPage];

                let thirdPageExists = this.nextPageExists(seoondPage);
                if (thirdPageExists) {
                    pageButtonsToShow.push(seoondPage + 1);
                }

                return pageButtonsToShow;
            }

            let previousPage = this.currentPage - 1;
            pageButtonsToShow = [previousPage, this.currentPage];

            if (this.nextPageExists(this.currentPage)) {
                pageButtonsToShow.push(this.currentPage + 1);
            }

            return pageButtonsToShow;
        }
    },

    watch: {
        currentPage: function () {
            this.$emit("input", this.currentPage)
        },
        value: function () {
            this.currentPage = this.value;
        }
    },

    mounted() {
        this.currentPage = this.value;
    },

    methods: {
        changePage: function (newPage) {
            this.currentPage = newPage;
        },
        nextPageExists: function(fromPage){
            return fromPage + 1 <= this.maximum_page;
        }
    }
}
</script>