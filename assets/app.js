
const parallax = document.getElementById("parallax");

window.addEventListener("scroll", function() {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * -0.5 + "px";
})

$("#searchBtn").on("click", function(){
    var input = $("#city-input").val().trim();
    $("#city-name").html("<h1>" + input + "</h1>");
});
