// data needed to populate page
const topics = [
  'The Sopranos',
  'Peep Show',
  'Alan Partridge',
  'Twin Peaks',
  'Curb Your Enthusiasm',
  'The IT Crowd',
  'Saved By The Bell'
];
let tvShow = '';
let queryURL = '';

//loop to create buttons on html page
const renderButtons = () => {
  $('#buttonarea').empty();
  for (let i = 0; i < topics.length; i++) {
    let newBtn = $('<button>');
    newBtn.addClass('btn btn-primary btn-sm ml-2 mb-1 mt-3 tvButton');
    newBtn.attr('type', 'button');
    newBtn.text(topics[i]);
    $('#buttonarea').append(newBtn);
  }

  //query the results for the button clicked
  $('.tvButton').on('click', function() {
    $('.gifs-here').empty();
    tvShow = this.textContent;
    queryURL =
      'https://api.giphy.com/v1/gifs/search?q=' +
      tvShow +
      '&api_key=Wc14oX9Ync7H65rBWNbS7ZRMYIOJSGq7&limit=10';
    //send ajax request
    $.ajax({ url: queryURL, method: 'GET' }).then(function(response) {
      let results = response.data;
      console.log(results);
      //print results to the DOM
      for (let i = 0; i < results.length; i++) {
        let gifDiv = $('<div>');
        gifDiv.addClass('gif-block col-3-sm');
        let rating = results[i].rating;
        let p = $('<p>').text('Rated: ' + rating.toUpperCase());
        let gif = $('<img>');
        gif.attr('src', results[i].images.original_still.url);
        gif.attr('data-still', results[i].images.original_still.url);
        gif.attr('data-animate', results[i].images.original.url);
        gif.attr('data-state', 'still');
        gif.addClass('img-responsive center-block gif');
        gifDiv.prepend(p);
        gifDiv.prepend(gif);
        $('.gifs-here').prepend(gifDiv);
      }

      //animate or pause the gif on click
      $('.gif').on('click', function() {
        let state = $(this).attr('data-state');
        if (state === 'still') {
          $(this).attr('src', $(this).attr('data-animate'));
          $(this).attr('data-state', 'animate');
        } else if (state === 'animate') {
          $(this).attr('src', $(this).attr('data-still'));
          $(this).attr('data-state', 'still');
        }
      });
    });
  });
};

renderButtons();

//adds new tv show
$('#addTvShow').on('click', function(event) {
  event.preventDefault();
  topics.push($('#tv-input').val());
  renderButtons();
});
