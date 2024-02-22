import Vue from "vue";
export default {
    namespaced : true,
    state : {
        adminTabs : {
            "Users" : {
                "title" : "Users",
                "weight" : 100,
                "endpoint" : "user",
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Email",
                        "field" : "email"
                    },
                    {
                        "text" : "Registered on",
                        "field" : "created_at"
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "Assume",
                        "class" : "btn btn-danger mx-1",
                        "onClick" : "get|user/assume"
                    }
                ],
                items : [],
                searchParams : {
                },
                "page" : 1,
                maximumPage : 1,
            },
            "Authors" : {
                "title" : "Authors",
                "weight" : 95,
                "endpoint" : "author?withBookCount=true",
                "showParams" : {},
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Name",
                        "field" : "name"
                    },
                    {
                        "text" : "Last name",
                        "field" : "last_name"
                    },
                    {
                        "text" : "Books",
                        "field" : "books_count"
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "Edit",
                        "class" : "btn btn-warning mx-1",
                        "onClick" : "emit:showForm"
                    }
                ],
                items : [],
                searchInputs : {
                },
                searchParams : {
                },
                "page" : 1,
                maximumPage : 1,
            },
            "Categories" : {
                "title" : "Category",
                "weight" : 95,
                "endpoint" : "category?withActiveLoanCount=true&withLoanCount=true",
                "showParams" : {},
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Name",
                        "field" : "text"
                    },
                    {
                        "text" : "Books",
                        "field" : "books_count"
                    },
                    {
                        "text" : "Active loans",
                        "field" : "active_loans_count"
                    },
                    {
                        "text" : "Total loans",
                        "field" : "loans_count"
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "Edit",
                        "class" : "btn btn-warning mx-1",
                        "onClick" : "emit:showForm"
                    }
                ],
                items : [],
                searchInputs : {
                },
                searchParams : {
                },
                page : 1,
                maximumPage : 1,
            },
            "Books" : {
                "title" : "Book",
                "weight" : 90,
                "endpoint" : "book?perPage=5&withActiveLoanCount=true&withLoanCount=true",
                "showParams" : {},
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Name",
                        "field" : "name"
                    },
                    {
                        "text" : "Category",
                        "field" : "category.text"
                    },
                    {
                        "text" : "Active loans",
                        "field" : "active_loans_count"
                    },
                    {
                        "text" : "Total loans",
                        "field" : "loans_count"
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "Edit",
                        "class" : "btn btn-warning mx-1",
                        "onClick" : "emit:showForm"
                    }
                ],
                items : [],
                searchInputs : {
                    "categories" : {
                        "label" : "Categories",
                        "field_type" : "selectMultiple",
                        "showValues" : true,
                        "name" : "Category",
                        "source" : "get|category?noPage=true",
                        "options_text_field" : "text"
                    }
                },
                searchParams : {
                },
                page : 1,
                maximumPage : 1,
            },
            "Loans" : {
                "title" : "Loans",
                "weight" : 90,
                "endpoint" : "loan?panel=true",
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "User",
                        "field" : "user.email"
                    },
                    {
                        "text" : "Book",
                        "field" : "book.name"
                    },
                    {
                        "text" : "Loaned on",
                        "field" : "started_at"
                    },
                    {
                        "text" : "Returned on",
                        "field" : "returned_at",
                        change : function(item){
                            return item.returned_at ?? "/";
                        }
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "Assume",
                        "class" : "btn btn-danger mx-1",
                        "onClick" : "get|user/assume"
                    }
                ],
                items : [],
                searchInputs : {
                    "since" : {
                        label : "Loaned after",
                        field_type : "datetime"
                    }
                },
                searchParams : {
                    "since" : undefined
                },
                "page" : 1,
                maximumPage : 1,
            },
        },
        currentTab : "Users"
    },

    actions : {

    },

    mutations : {
        setTabs(state, newTabs){
            state.adminTabs = newTabs;
        },
        setCurrentTab(state, newTab){
            state.currentTab = newTab;
        },
        setItemsForTab(state, newItems){
            state.adminTabs[state.currentTab].items = newItems;
        },
        setTabField(state, fieldAndValue){
            let {name, value} = fieldAndValue;

            let tab = state.adminTabs[state.currentTab];

            Vue.set(tab, name, value);
        },
        setTabSearchParam(state, fieldAndValue){
            let {field, value} = fieldAndValue;

            let tab = state.adminTabs[state.currentTab];

            tab.searchParams[field] = value;
        }
    },

    getters : {
        getTabs(state){
            return state.adminTabs;
        },
        getCurrentTab(state){
            return state.currentTab;
        },
        getTab(state){
           return state.adminTabs[state.currentTab]; 
        }
    }
}