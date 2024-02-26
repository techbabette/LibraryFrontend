import axiosInstance from "@/axios/axios";
import Vue from "vue";
import router from '../../router/router';
export default {
    namespaced : true,
    state : {
        adminTabs : {
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
                        "name" : "Return",
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
                "selectedSort" : "", "page" : 1,
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
                        "field" : "loans_count"
                    },
                    {
                        "text" : "Total loans",
                        "field" : "all_loans_count"
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "Edit",
                        "class" : "btn btn-warning mx-1",
                        "onClick" : "emit:showForm"
                    },
                    {
                        "name" : "Delete",
                        "class" : "btn btn-danger mx-1",
                        "onClick" : "delete|book"
                    }
                ],
                "table_options" : [
                    {
                        "name" : "Create new book",
                        "class" : "btn btn-success m-1",
                        "onClick" : "emit:showForm"
                    },
                ],
                items : [],
                searchInputs : {
                    "categories" : {
                        "label" : "Categories",
                        "field_type" : "selectMultiple",
                        "showValues" : true,
                        "hint" : "Click to show options",
                        "source" : "get|category?noPage=true",
                        "options_text_field" : "text"
                    }
                },
                searchParams : {
                },
                page : 1,
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
                        "onClick" : "emitshowForm"
                    },
                    {
                        "name" : "Show books",
                        "class" : "btn btn-info mx-1",
                        "onClick" : "dispatch|admin/booksWithCategory"
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
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
            "Links" : {
                "title" : "Links",
                "endpoint" : "link?panel=true",
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Text",
                        "field" : "text"
                    },
                    {
                        "text" : "Leads to",
                        "field" : "to"
                    },
                    {
                        "text" : "Shown to",
                        "field" : "access_level.access_level",
                        "change" : function(item){
                            return item.access_level.name;
                        }
                    },
                    {
                        "text" : "Position",
                        "field" : "link_position.position"
                    },
                    {
                        "text" : "Icon",
                        "field" : "icon"
                    }
                ],
                items : [],
                searchParams : {
                },
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
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
                        "onClick" : "dispatch|admin/assumeUser"
                    }
                ],
                items : [],
                searchParams : {
                },
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
            "Message Types" : {
                "title" : "Message types",
                "weight" : 50,
                "endpoint" : "messagetype?panel=true",
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Name",
                        "field" : "name"
                    },
                    {
                        "text" : "Number of messages",
                        "field" : "messages_count"
                    }
                ],
                "itemOptions" : [
                    {
                        "name" : "View messages",
                        "class" : "btn btn-info mx-1",
                        "onClick" : "dispatch|admin/messagesOfType"
                    }
                ],
                items : [],
                searchParams : {
                },
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
            "Messages" : {
                "title" : "Messages",
                "weight" : 45,
                "endpoint" : "message",
                "idField" : "id",
                "tableHeaders" : [
                    {
                        "text" : "Sender",
                        "field" : "user.email"
                    },
                    {
                        "text" : "Sent at",
                        "field" : "created_at"
                    },
                    {
                        "text" : "Title",
                        "field" : "title"
                    },
                    {
                        "text" : "Message type",
                        "field" : "message_type.name"
                    },
                    {
                        "text" : "Body (Shortened)",
                        "field" : "body"
                    }
                ],
                items : [],
                searchParams : {
                },
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
            "Returned loans" : {
                "title" : "Loans",
                "weight" : 90,
                "endpoint" : "loan?previous=true&panel=true",
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
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
            "Inactive books" : {
                "title" : "Book",
                "weight" : 90,
                "endpoint" : "book?perPage=5&previous=true&withLoanCount=true",
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
            "Inactive categories" : {
                "title" : "Category",
                "weight" : 95,
                "endpoint" : "category?previous=true&withLoanCount=true",
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
                    },
                    {
                        "name" : "Show books",
                        "class" : "btn btn-info mx-1",
                        "onClick" : "dispatch|admin/booksWithCategory"
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
            "Inactive authors" : {
                "title" : "Authors",
                "weight" : 95,
                "endpoint" : "author?withBookCount=true&previous=true",
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
                "selectedSort" : "", "page" : 1,
                maximumPage : 1,
            },
        },
        currentTab : "Loans"
    },

    actions : {
        async assumeUser(context, userId){
            let response = await axiosInstance.get(`user/assume/${userId}`);

            router.push("/").catch(() => {});

            context.commit("messages/display", {text : "Successfully assumed user", success : true}, {root : true});
            context.commit("user/changeToken", response.body, {root : true});

            return {success : true};
        },
        booksWithCategory(context, categoryId){
            Vue.set(context.state, 'currentTab', "Books");
            Vue.set(context.state.adminTabs.Books.searchParams, 'categories', [categoryId]);

            return {success : true};
        }
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