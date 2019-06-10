
const parallax = document.getElementById("parallax");

window.addEventListener("scroll", function () {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * -0.5 + "px";
})

$("#searchBtn").on("click", function () {
    $("#city-name").show();
    $("#new-city").show();
    $("#carousel").show();
    var input = $("#city-input").val().trim();
    $("#city-name").html("<h1>" + input + "</h1>");

    var API_KEY = '12715505-5709c2fd53c134eb9abea5b53';
    var URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(input);
    $.getJSON(URL, function (data) {
        var hits = data.hits
        for (i = 0; i < hits.length; i++) {
            console.log(data.hits[i].largeImageURL);
        };
        $("#new-city").css("background-image", "url(" + data.hits[0].largeImageURL + ")");
    });


    var headline = $("<div>").addClass("card-deck");
    var qUrl = 'https://newsapi.org/v2/everything?q=' + input + '&apiKey=ba75c605a3c141558186bc2db4f3dc52';
    $.ajax({
        url: qUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < 4; i++) {
            var cardThing = $("<div>").addClass("card col-md-10");

            var cardBody = $("<div>").addClass("card-body");
            cardBody.append("<h6>" + response.articles[i].author + "</h6>");
            cardBody.append($('<a href=' + response.articles[i].url + '></a>').html('<h3>' + response.articles[i].title + '</h3>'));
            cardBody.append(response.articles[i].description);
            cardThing.append(cardBody);
            headline.append(cardThing);
        }
    });
    $("#new-city").append(headline);



});

  //Carousel Code
  $('#recipeCarousel').carousel({
    interval: 1000
})

$('.carousel .carousel-item').each(function () {
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i = 0; i < 2; i++) {
        next = next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
    }
});





