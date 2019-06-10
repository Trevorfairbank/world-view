
const parallax  = document.getElementById("parallax");

window.addEventListener("scroll", function () {
let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * -0.5 + "px";
})

$("#searchBtn") .on("click", function () {
    var input = $("#city-input").val().trim();
        $("#city-name").html("<h1>" + input + "</h1>");

    var API_KEY = '12715505-5709c2fd53c134eb9abea5b53';
    //Monday - Max - added per_page parameter so pixabay returns 200 results instead of 20
        var URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(input) + "&per_page=200";
        $.getJSON(URL, function (data) {
            var hits = data.hits
            for (i = 0; i < hits.length; i++) {
                console.log(data.hits[i].comments);
                //Monday - Max - adding in method to sort returned items and sort them... for now I will do this as an array of the top 20 hits by # of favorites. We can then decide whether we want to have a random single image as background or do something fancier with that array of results.
        

            }

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





