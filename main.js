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

        $('button.delete').click(function () {

            var url = BASE_URL + 'api/' + $(this).attr("id");
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function (result) {
                    alert('Usunięto');
                }
            });
        });




    }


    function handleSingleResponse(object) {
        if ($('#AddHero').length) {
            $('#AddHero').remove();
        }
        if ($('#EditHero').length) {
            $('#EditHero').remove();
        }
        var DetailedHero = '';
        var i = 0;
        for (key in object) {
            DetailedHero = '<span>' + $('#Details').find('li').eq(i).find('span').eq(0).html() + '</span>';

            if (key == 'url') {
                DetailedHero += '<img src="' + object[key] + '">'
            } else {
                DetailedHero += '<span>' + object[key] + '</span>';
            }

            $('#Details').find('li').eq(i).html(DetailedHero);
            i++;

        }
        $('#second').append('<button id="EditHero">Edytuj tego bohatera</button>');

        $('#EditHero').click(function () {
            Edit2();
            $('#EditHero').remove();
            $('#second').append('<button id="EditHeroSend">Wyslij na serwer</button>')
            $('#EditHeroSend').click(function () {
                var object = {
                    id: $('#Details').find('li').eq(0).find('input').val(),
                    superhero: $('#Details').find('li').eq(1).find('input').val(),
                    publisher: $('#Details').find('li').eq(2).find('input').val(),
                    firstAppearance: $('#Details').find('li').eq(3).find('input').val(),
                    characters: $('#Details').find('li').eq(4).find('input').val(),
                    url: $('#Details').find('li').eq(5).find('input').val(),
                    description: $('#Details').find('li').eq(6).find('input').val()
                };
                console.log(object);
                object = JSON.stringify(object);
                var url = BASE_URL + 'api/hero/' + $('#Details').find('li').eq(0).find('input').val();

                console.log(url);
                $.ajax({
                    url: url,
                    type: 'PUT',
                    data: object,
                    contentType: "application/json; charset=utf-8", // this
                    dataType: "json", // and this
                    success: function (result) {
                        alert('Zedytowano');
                    }
                });
            })
        })


    }







}

window.onload = () => {



    $('#Add').click(function () {
        $('#EditHero').remove();
        Edit();
        $('#second').append('<button id="AddHero">Dodaj nowego bohatera</button>');
        $('button#AddHero').click(function () {
            console.log($('#Details').find('li').eq(0).find('input').val());
            var object = {
                id: $('#Details').find('li').eq(0).find('input').val(),
                superhero: $('#Details').find('li').eq(1).find('input').val(),
                publisher: $('#Details').find('li').eq(2).find('input').val(),
                firstAppearance: $('#Details').find('li').eq(3).find('input').val(),
                characters: $('#Details').find('li').eq(4).find('input').val(),
                url: $('#Details').find('li').eq(5).find('input').val(),
                description: $('#Details').find('li').eq(6).find('input').val()
            };
            console.log(object);
            object = JSON.stringify(object);
            var url = BASE_URL + 'api/hero/';
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: object,
                success: function (result) {
                    alert('Dodano');
                }
            });

        })
    });




}




function Edit() {
    var Source = '';
    var Key = '';
    for (var i = 0; i < 7; i++) {
        Source = $('#Details').find('li').eq(i).find('span').eq(0).html();

        Source = '<span>' + Source + '</span>'
        Key = $('#Details').find('li').eq(i).attr("class");
        Source += '<input class="' + Key + '" type="text">';

        $('#Details').find('li').eq(i).html(Source);
    }
}

function Edit2() {
    var Source = '';
    var Key = '';
    var bubu = '';
    var klasa = '';
    for (var i = 0; i < 7; i++) {
        Source = $('#Details').find('li').eq(i).find('span').eq(0).html();
        bubu = $('#Details').find('li').eq(i).find('span').eq(1).html();
        Source = '<span>' + Source + '</span>'
        Key = $('#Details').find('li').eq(i).attr("class");
        Source += '<input class="' + Key + '" type="text">';
        klasa = 'input.' + Key;
        console.log(klasa);
        console.log(bubu);

        $('#Details').find('li').eq(i).html(Source);
        $(klasa).val(bubu);
    }
}





