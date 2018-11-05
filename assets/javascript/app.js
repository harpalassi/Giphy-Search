// variables
var topics = ["The Sopranos", "Shameless", "Degrassi", "Curb Your Enthusiasm", "The IT Crowd"];
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
    $(".gifs-here").empty();
    tvShow = (this.textContent);
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        tvShow + "&api_key=Wc14oX9Ync7H65rBWNbS7ZRMYIOJSGq7&limit=10";

 $.ajax({url: queryURL, method: "GET"})
 .then(function(response) {
     var results = response.data;
     console.log(results);

     for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        gifDiv.addClass("gif-block col-3-sm")
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating.toUpperCase());
        var gif = $("<img>");
        gif.attr("src", results[i].images.original_still.url);
        gif.attr("data-still", results[i].images.original_still.url)
        gif.attr("data-animate", results[i].images.original.url)
        gif.attr("data-state", "still");
        gif.addClass("img-responsive center-block gif")
        gifDiv.prepend(p);
        gifDiv.prepend(gif);
        $(".gifs-here").prepend(gifDiv);   
      }

      $(".gif").on("click", function() {
        console.log("test"); 
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }});


})

})

