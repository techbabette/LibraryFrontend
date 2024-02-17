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
            categories : [],
            authors : [],
            maximumPage : 1,
            page : 1,
            years : [],
        },
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
        setSearchParam(state, info){
            let {name, value} = info;
            state.searchData[name] = value;
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
        getSearchParam : (state) => (param) => {
            return state.searchData[param];
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
            let params = additionalOptions.params;

            let result = (await axios.get("/book", {params}));
            if(!result.success){
                return result;
            }

            let books = result.data.body.data;
            Vue.set(state.books, additionalOptions.name, books);
            return result;
        },
    }
}