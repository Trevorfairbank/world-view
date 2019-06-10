
const parallax = document.getElementById("parallax");

window.addEventListener("scroll", function () {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * -0.5 + "px";
})

$("#searchBtn").on("click", function () {
    var input = $("#city-input").val().trim();
    $("#city-name").html("<h1>" + input + "</h1>");
    var headline = $("<div>");
    headline.css({
        'float': 'screenLeft',
        'border': '1px solid black'
    })
    var qUrl = 'https://newsapi.org/v2/everything?q=' + input + '&apiKey=ba75c605a3c141558186bc2db4f3dc52';
    $.ajax({
        url: qUrl,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for (var i = 0; i < 5; i++) {
            var cardThing = $("<div>").addClass("card");
            var cardBody = cardThing.append($("<div>").addClass("card-body"));
            cardBody.append("<h3>" + response.articles[i].title + "</h3>");
            cardBody.append("<h6>" + response.articles[i].author + "</h6>");
            cardBody.append($('<a href=' + response.articles[i].url + '>Go to Article</a>'));
            headline.append(cardThing);
        }
    });
    $("#new-city").html(headline);
});