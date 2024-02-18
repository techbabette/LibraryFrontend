<script>
export default {
    name : "BookShelfItem",

    props : {
        book : Object
    },

    methods : {
        LimitToFullWords : function(text, maximumCharacterLength){
            let textSplit = text.split(" ");
            let returnText = "";
            for(let word of textSplit){
                if(word.length + returnText.length <= maximumCharacterLength) returnText += word + ' ';
                else{
                    returnText = returnText.trim() + '...';
                    break;
                }
            }
            return returnText;
        },
        imgSource : function (img){
            return require('@/assets/imgs/'+img)
        } 
    },
}
</script>
<template>
    <div class="flex col-12 col-md-6 col-lg-3 justify-content-center">
        <div class="card book mk-card-limit">
        <a href=""><img :src="imgSource(book.img)" :alt="book.name" class="card-img-top book-prev img-fluid"></a>
            <div class="card-body book-body">
            <router-link :to="{name : 'book preview', params: { id: book.id }}"> <h5 class="card-title book-title">{{ book.name }}</h5></router-link>
            <p class="card-text book-desc"><em> {{ LimitToFullWords(book.description,30) }}</em></p>
            <p class="card-text mk-light-yellow">
            <a href="">{{ book.category.text }}</a>
            </p>
                <p class="card-text">
                <a href>{{ book.author.name + " " + book.author.last_name}}</a>
            </p>
        </div>
        </div>
    </div>
</template>