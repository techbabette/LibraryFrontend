<template>
    <div class="flex col-12 col-md-6 col-lg-3 justify-content-center">
        <div class="card book mk-card-limit">
        <a href=""><img :src="imgSource(Book.img)" :alt="Book.name" class="card-img-top book-prev img-fluid"></a>
            <div class="card-body book-body">
            <router-link :to="{name : 'Book preview', params: { id: Book.id }}"> <h5 class="card-title book-title">{{ Book.name }}</h5></router-link>
            <p class="card-text book-desc"><em> {{ LimitToFullWords(Book.description,30) }}</em></p>
            <p class="card-text mk-light-yellow">
            <a href="">{{ Book.category.text }}</a>
            </p>
                <p class="card-text">
                <a href>{{ Book.author.name + " " + Book.author.last_name}}</a>
            </p>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    name : "SingleBook",
    props : {
        Book : Object
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