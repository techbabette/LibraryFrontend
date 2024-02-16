import axios from "@/axios/axios";
import Vue from "vue";
export default{
    state : {
        books : {

        },
        searchOptions : {
            sorts : [

            ],
            categories : [
                {
                    name : "Sci-Fi",
                    id : 1
                },
                {
                    name : "Historical",
                    id : 2
                }
            ],
            authors : [

            ],
            years : [

            ]
        },
        searchData : {
            sortId : 1,
            categories : [1],
            authors : [],
            years : [],
            currentPage : 1
        },
        searchResultPages : 3,
        currentlyViewedBookInfo : {
            currentBookId : "0",
            data : {
                id : 0,
                name : "",
                author : {},
                category : {},
                img : "",
                description:"",
                copies:5,
                releaseDate:2022,
                timeLoaned : 5
            }
        },
    },
    mutations : {
        setSelectedCategories(state, categories){
            state.searchData.categories = categories;
        },
        setSearchPage(state, newPage){
            state.searchData.currentPage = newPage;
        },
        setCurrentBookId(state, newId){
            state.currentlyViewedBookInfo.currentBookId = newId;
        },
        setCurrentlyViewedBookInfo(state, currentlyViewedBookData){
            state.currentlyViewedBookInfo.data = currentlyViewedBookData
        }
    },
    getters : {
        getCategoryOptions(state){
            return state.searchOptions.categories;
        },
        getSelectedCategories(state){
            return state.searchData.categories;
        },
        getNewestBooks(state){
            return state.books.newestBooks;
        },
        getCurrentSearchPage(state){
            return state.searchData.currentPage;
        },
        getAvailableSearchPages(state){
            return state.searchResultPages;
        },
        getViewedBookInfo(state){
            return state.currentlyViewedBookInfo.data;
        },
        getBooks: (state) => (alias) => {
            return state.books[alias];
        }
    },
    actions : {
        async getBookInformationById({state, commit}, bookId){
            commit("setCurrentBookId", bookId);
            let bookInfo = state.books.newestBooks.find((el) => el.id === parseInt(bookId));
            commit("setCurrentlyViewedBookInfo", bookInfo)
        },
        async fetchBooks({state}, additionalOptions){
            let books = (await axios.get("/book", {params :additionalOptions.params})).data.body.data;

            Vue.set(state.books, additionalOptions.name, books);
        }
    }
}