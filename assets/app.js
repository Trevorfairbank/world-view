
const parallax = document.getElementById("parallax");

window.addEventListener("scroll", function () {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * -0.5 + "px";
})

$("#searchBtn").on("click", function () {
    var input = $("#city-input").val().trim();
    $("#city-name").html("<h1>" + input + "</h1>");

    var API_KEY = '12715505-5709c2fd53c134eb9abea5b53';
    var URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(input);
    $.getJSON(URL, function (data) {
        if (parseInt(data.totalHits) > 0) $.each(data.hits, function (i, hit) {
            console.log(hit);
        });
        else
            console.log('No hits');
    });
});




