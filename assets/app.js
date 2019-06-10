
const parallax = document.getElementById("parallax");

window.addEventListener("scroll", function () {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * -0.5 + "px";
})

var data;
var hits;

$("#searchBtn").on("click", function () {
    var input = $("#city-input").val().trim();
    $("#city-name").html("<h1>" + input + "</h1>");

    var API_KEY = '12715505-5709c2fd53c134eb9abea5b53';
    var URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(input);
    $.getJSON(URL, function (data) {
        hits = data.hits;
        for (i = 0; i < hits.length; i++) {
            console.log(data.hits[i].largeImageURL);
           
        }

        $("#new-city").css("background-image", "url(" + data.hits[0].largeImageURL + ")");

    });


    var headline = $("<div>");
    headline.css({
        'float': 'screenLeft',
        'border': '1px solid black'
    })
    var qUrl = 'https://newsapi.org/v2/everything?q=' + input + '&apiKey=ba75c605a3c141558186bc2db4f3dc52';
    $.ajax({
        url: qUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < 5; i++) {
            var cardThing = $("<div>").addClass("card");
            var cardBody = cardThing.append($("<div>").addClass("card-body"));
            cardBody.append("<h3>" + response.articles[i].title + "</h3>");
            cardBody.append("<h6>" + response.articles[i].author + "</h6>");
            cardBody.append($('<a href=' + response.articles[i].url + 'class="btn btn-primary">Go to Article</a>'));
            headline.append(cardThing);
        }
    });
    $("#new-city").html(headline);




});







