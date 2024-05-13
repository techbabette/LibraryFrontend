# [City Library](https://dszkzv3o6c2jj.cloudfront.net) Frontend

A full description of application features can be found here [here](https://dszkzv3o6c2jj.cloudfront.net/documentation.pdf).

## Deployment

Originally deployed on AWS with the architecture shown below.

![Original three layer deployment](https://i.imgur.com/UPA5tK6.png "Original deployment")

## CI/CD

Every push to the main branch is followed by a deployment to S3 and Cloudfront cache invalidation

## JSON forms

The [InputForm](https://github.com/techbabette/LibraryFrontend/blob/main/src/components/InputForm.vue) component generates form inputs based on input definitions supplied to it as a prop.
The component allows for many input types that can optionally read data from external sources (Available categories, for example).

The example JSON below results in the form found on the [contact page](https://github.com/techbabette/LibraryFrontend/blob/main/src/components/PageContact.vue).

```
formElements: {
    "title": {
        field_type: "string",
        label: "Title"
    },
    "message_type_id": {
        field_type: "select",
        label: "Message type",
        source: "get|messagetype?noPage=true"
    },
    "body": {
        field_type: "text",
        label: "Message text",
    }
}
```

![Contact form](https://i.imgur.com/KzosTGE.png "Contact form")

## JSON tables

The [GenericTable](https://github.com/techbabette/LibraryFrontend/blob/main/src/components/GenericTable.vue) and [GenericTableComplete](https://github.com/techbabette/LibraryFrontend/blob/main/src/components/GenericTableComplete.vue) components allow for generating entire user/admin preview & control tables, reading and modifying data from external sources.

[GenericTableComplete](https://github.com/techbabette/LibraryFrontend/blob/main/src/components/GenericTableComplete.vue) integrates sort options recieved from [the backend](https://github.com/techbabette/libraryBackend/tree/dev) directly into the current table, enabling sorting by table headers.

The example JSON below results in one of the many admin tabs

```
"Books" : {
    "title" : "Books",
    "weight" : 90,
    "endpoint" : "book?perPage=5&withActiveLoanCount=true&withLoanCount=true",
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
            "text" : "Author",
            "field" : "author.full_name"
        },
        {
            "text" : "Created at",
            "field" : "created_at"
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
            "name" : "Deactivate",
            "class" : "btn btn-danger mx-1",
            "onClick" : "delete|book"
        },
        {
            "name" : "View",
            "class" : "btn btn-primary mx-1",
            "onClick" : "dispatch|navigation/openBookPage"
        },
    ],
    "tableOptions" : [
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
        },
        'authors' : {
            "label" : "Authors",
            "field_type" : "selectMultiple",
            "showValues" : true,
            "hint" : "Click to show options",
            "source" : "get|author?noPage=true",
            "options_text_field" : "full_name",
            'class' : 'mx-2'
        }
    },
    searchParams : {
    },
    "selectedSort" : "",
    "page" : 1,
    maximumPage : 1,
},
```

![Books tab](https://i.imgur.com/2c0iBo2.png "Books tab")

maximumPage defaults to 1 and is overriden on server response.

The searchInputs utilize the [InputForm](https://github.com/techbabette/LibraryFrontend/blob/main/src/components/InputForm.vue) component.

The edit and create forms utilize the [InputForm](https://github.com/techbabette/LibraryFrontend/blob/main/src/components/InputForm.vue) component, the definitions are passed to the [GenericTableComplete](https://github.com/techbabette/LibraryFrontend/blob/main/src/components/GenericTableComplete.vue) as the 'forms' prop.
