var firebaseConfig = {
    apiKey: "AIzaSyBm5HWmW_0DLSzUfpjJm4Y7L0FPsbrDKBA",
    authDomain: "world-view-e928c.firebaseapp.com",
    databaseURL: "https://world-view-e928c.firebaseio.com",
    projectId: "world-view-e928c",
    storageBucket: "world-view-e928c.appspot.com",
    messagingSenderId: "754741009676",
    appId: "1:754741009676:web:afaee58b15ad7e34"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var counterArray = [];

database.ref().on("value", function (snapshot) {
    counterArray = snapshot.val().array
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

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
    console.log(findArray(input));

    addArray(input);

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
        if (response.articles.length === 0) {
            headline.append($("<h1>No Articles Found</h1>").css("color", "white"));
        }
        else {
            for (var i = 0; i < 4; i++) {
                var cardThing = $("<div>").addClass("card col-md-10");
                var date = moment(response.articles[i].publishedAt).format("MMM Do YYYY");
                var cardBody = $("<div>").addClass("card-body");
                if (response.articles[i].author == null) {
                    cardBody.append("<h6>Unknown Author</h6>");
                }
                else {
                    cardBody.append("<h6>" + response.articles[i].author + "</h6>");
                }
                date = date.fontcolor("gray");
                cardBody.append($('<a target = _blank href=' + response.articles[i].url + '></a>').html('<h3>' + response.articles[i].title + '</h3>'));
                cardBody.append("<p>" + date + "</p>");
                cardBody.append(response.articles[i].description);
                cardThing.append(cardBody);
                headline.append(cardThing);
            }
        }
    });
    $("#new-city").html(headline);
    $('html, body').animate({
        scrollTop: $("#new-city").offset().top
    }, 1400);
    database.ref().set({
        array: counterArray
    });
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

function addArray(search) {
    var inArray = false;
    for (var i = 0; i < counterArray.length; i++) {
        if (counterArray[i].keyword == search) {
            inArray = true;
            counterArray[i].counter++
        }
    }
    if (!inArray) {
        counterArray.push({
            keyword: search,
            counter: 1
        })
    }
}

function findArray(search) {
    for (var i = 0; i < counterArray.length; i++) {
        if (counterArray[i].keyword == search) {
            return counterArray[i].counter;
        }
    }
}