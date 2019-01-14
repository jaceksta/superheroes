const BASE_URL = 'https://us-central1-itfighters-hero.cloudfunctions.net/';

getSuperHeroList();



function getSuperHeroList() {

    var url = BASE_URL + 'api/hero';
    $.get(url, function (response) {
        handleResponse(response);
    })


    function handleResponse(heroes) {
        var allHeroes = '';
        for (let index = 0; index < heroes.length; index++) {
            const hero = heroes[index];
            allHeroes += '<li>' + hero.id + ' ' + hero.superhero + ' ' + hero.publisher + ' ' + '<button class="details" id="' + hero.id + '">Szczegóły</button>' + '</li>';

        }
        var heroesList = $(allHeroes);
        $('#superHeroes').append(heroesList);
        $('button').click(function () {

            var url = BASE_URL + 'api/hero/' + $(this).attr("id");
            console.log(url);
            $.get(url, function (response) {
                handleSingleResponse(response);
            })

        });

        function handleSingleResponse(object){
            var DetailedHero = '';
            for (key in object){
                DetailedHero += key + ' ' + object[key] + ' ';

            }
            console.log(DetailedHero);
        }
    }

}








