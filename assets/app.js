
const parallax = document.getElementById("parallax");
let offset = window.pageYOffset;
parallax.style.backgroundPositionY = offset * -0.5 + "px";

window.addEventListener("scroll", function () {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * -0.5 + "px";
})

$(window).keydown(function (event) {
    if ((event.keyCode == 13)) {
        searchFunction();
        event.preventDefault();
        return false;
    }
});

$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    searchFunction();
});

function searchFunction() {
        $("#new-city").css("background-image", "url(https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/f9203f43012225.57e05eb56b036.png)");
        $("#city-name").show();
        $("#new-city").show();
        var input = $("#city-input").val().trim();
        input = titleCase(input);
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
                cardBody.append($('<a target = _blank href=' + response.articles[i].url + '></a>').html('<h3>' + response.articles[i].title + '</h3>'));
                cardBody.append(response.articles[i].description);
                cardThing.append(cardBody);
                headline.append(cardThing);
            }
        });
        $("#new-city").html(headline);
        $('html, body').animate({
            scrollTop: $("#new-city").offset().top
        }, 1400);

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }
}