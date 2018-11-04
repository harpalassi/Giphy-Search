// variables
var topics = ["The Sopranos", "Shameless", "Degrassi", "Alan Partridge", "The IT Crowd"];
var tvShow = "";
var queryURL = "";

//loop to create buttons on html page
for (var i = 0; i < topics.length; i++) {
    var newBtn = $("<button>");
    newBtn.addClass("btn btn-primary btn-sm ml-2 mb-1");
    newBtn.attr("type", "button");
    newBtn.text(topics[i]);
    $("#buttonarea").append(newBtn);
}

$("button").on("click", function() {
    tvShow = (this.textContent);
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        tvShow + "&api_key=Wc14oX9Ync7H65rBWNbS7ZRMYIOJSGq7&limit=10";

 $.ajax({url: queryURL, method: "GET"})
 .then(function(response) {
     var results = response.data;
     console.log(results);

     for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        gifDiv.addClass("gif-block col-6-sm")
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating.toUpperCase());
        var gif = $("<img>");
        gif.attr("src", results[i].images.fixed_height.url);
        gif.addClass("img-responsive center-block")
        gifDiv.prepend(p);
        gifDiv.prepend(gif);
        $(".gifs-here").prepend(gifDiv);
      }




})

})