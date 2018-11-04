// variables
var topics = ["The Sopranos", "Shameless", "Degrassi", "Alan Partridge", "The IT Crowd"];

//loop to create buttons on html page
for (var i = 0; i < topics.length; i++) {
    var newBtn = $("<button>");
    newBtn.addClass("btn btn-primary");
    newBtn.attr("type", "button");
    newBtn.text(topics[i]);
    $("#buttonarea").append(newBtn);

}