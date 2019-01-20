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
            allHeroes += '<li>' + hero.id + ' ' + hero.superhero + ' ' + hero.publisher + ' ' + '<button class="details" id="' + hero.id + '">Szczegóły</button>' + '<button class="delete" id="hero/' + hero.id + '">Usuń</button>' + '</li>';

        }
        var heroesList = $(allHeroes);
        $('#superHeroes').append(heroesList);
        $('button.details').click(function () {
            var url = BASE_URL + 'api/hero/' + $(this).attr("id");
            $.get(url, function (response) {
                handleSingleResponse(response);
            })

        });

        $('button.delete').click(function(){
            var url = BASE_URL + 'api/' + $(this).attr("id");
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function(result) {
                    alert('Usunięto');  
                }
            });
        })

        function handleSingleResponse(object){
            $('#Details').empty();
            var DetailedHero = '';
            for (key in object){
                DetailedHero += '<li>' + key + ' ' + object[key] + '</li>';

            }
            $('#Details').append(DetailedHero);
        }
    }

}








