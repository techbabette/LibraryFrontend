export default{
    state : {
        books : {
            newestBooks : [
                {
                    "id" : 1,
                    "name":"Manipulacija i moć",
                    "category":{
                        "id" : 1,
                        "name": "Popularna psihologija"
                    },
                    "author":{
                        "id" : 1,
                        "name" : "Henrik Feksevs"
                    },
                    "img":"https://i.imgur.com/02xRac2.jpg",
                    "description":"Želite da odmah primetite da vas neko laže? Flertujete na pravi način? Prodate svoju priču svima? Naravno, reći ćete, ko ne želi da poseduje ove veštine? Henrik Feksevs je fascinantna ličnost. Neki bi ga mogli opisati kao pomalo luckastog ekscentrika, ali ako pročitate njegovu knjigu, otkrićete da on savršeno dobro zna o čemu priča. A uz to je i duhovit.Verovatno se pitate da li je ova knjiga praktični vodič za iluzioniste? Ili možda priručnik za mađioničare početnike? Ili čak neki ezoterijski tekst? Ne, ova knjiga nije ništa od toga. Ona je namenjena svima koji žele da čitaju misli, bez potrebe da budu čarobnjaci. Položaj tela, intonacija govora, korak, pogled i pokreti otkrivaju naša osećanja. Često će ti neverbalni signali biti u direktnom sukobu sa porukom koju izražavamo rečima. ",
                    "copies":5,
                    "releaseDate":2022,
                    "timeLoaned" : 5
                },
                {
                    "id" : 2,
                    "name":"Francuski jezik",
                    "category":{
                        "id" : 2,
                        "name": "Jezici"
                    },
                    "author":{
                        "id" : 2,
                        "name" : "Biljana Aksentijević"
                    },
                    "img":"https://i.imgur.com/02xRac2.jpg",
                    "description":"Udžbenik iz francuskog",
                    "copies":2,
                    "releaseDate":2021,
                    "timeLoaned" : 5
                },
                {
                    "id" : 3,
                    "name":"Prosvećeni svet",
                    "category":{
                        "id" : 3,
                        "name": "Popularna nauka"
                    },
                    "author":{
                        "id" : 4,
                        "name" : "Steven Pinker"
                    },
                    "img":"https://i.imgur.com/02xRac2.jpg",
                    "description":"U ovoj elegantnoj proceni stanja čovečanstva na početku trećeg milenijuma, kognitivni psiholog, intelektualac i mislilac Stiven Pinker poziva nas da se odaljimo od zastrašujućih naslova kojima smo zasuti i crnih proročanstava „stručnjaka“, koji igraju na kartu naših psihološki uslovljenih predrasuda. Umesto toga, on predlaže da jednostavno pratimo podatke. Pinker pokazuje da su život, zdravlje, prosperitet, sigurnost, mir, znanje i sreća u porastu, ne samo na Zapadu, već u čitavom svetu. Taj napredak nije rezultat neke kosmičke sile. To je dar prosvetiteljstva, uverenja da razum i nauka mogu da dovedu do procvata čovečanstva.",
                    "copies":2,
                    "releaseDate":2019,
                    "timeLoaned" : 6
                },
                {
                    "id" : 4,
                    "name":"Homo_Deus",
                    "category":{
                        "id" : 3,
                        "name": "Popularna nauka"
                    },
                    "author":{
                        "id" : 5,
                        "name" : "Juval Noa Harari"
                    },
                    "img":"https://i.imgur.com/02xRac2.jpg",
                    "description":"Šta će sada biti prioritetni problemi čovečanstva umesto gladi, bolesti i rata? Kakvu ćemo sudbinu nameniti ljudskom rodu, kao samoproklamovani bogovi planete Zemlje, koje korake ćemo preduzimati da to ostvarimo? Homo Deus istražuje projekte, snove i noćne more koji će oblikovati dvadeset prvi vek – od prevazilaženja smrti do stvaranja veštačkog života. Pred nama su osnovna pitanja na koja moramo da damo odgovore: u kom pravcu ćemo se dalje kretati? I kako ćemo zaštititi ovaj krhki svet od sopstvenih destruktivnih moći? Pred nama je sledeća faza evolucije: Homo Deus.",
                    "copies":3,
                    "releaseDate":2022,
                    "timeLoaned" : 8
                }
            ],
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
        searchResultPages : 3
    },
    mutations : {
        setSelectedCategories(state, categories){
            state.searchData.categories = categories;
        },
        setSearchPage(state, newPage){
            state.searchData.currentPage = newPage;
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
        }
    }
}