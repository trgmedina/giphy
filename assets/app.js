$(document).ready( function() {
	var topics = [
		'The Rock', 
		'Britney Spears', 
		'Kanye West',
		'Ariana Grande',
		'Zac Efron',
		'Barack Obama',
		'Tina Fey',
		'Steve Carell',
		'Michael Jordan',
		'Kobe Bryant',
		'Beyonce',
		'Ryan Gosling',
		'Samuel Jackson',
		'Drake',
		'Taylor Swift'
	];

	function createCelebBtns() {
		$('.buttonsDiv').empty();

		for (var i=0; i < topics.length; i++){
			var newBtn = $('<button class="btn btn-info btn-sm celeb-btn">' + topics[i] + '</button>');
			var celebName = topics[i].toLowerCase().replace(/\s/g, '');
			newBtn.attr('data-person', celebName);
			$('.buttonsDiv').append(newBtn);
		}
	}

	createCelebBtns();

	$('body').on('click', '.celeb-btn', function(e) {
		e.preventDefault();

		var person = $(this).attr('data-person');
		console.log(person);

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        	person + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax ({
        	url: queryURL,
        	method: 'GET'
        })
        .done(function(response) {
        	var results = response.data;
        	
        	$('.gifsDiv').empty();

       		for (var i = 0; i < results.length; i++) {
	            var gifDiv = $('<div>');

	            var rating = results[i].rating;

	            var h4 = $('<h4>').text('Rating: ' + rating);

	            var personGif = $('<img>');
	            personGif.attr('src', results[i].images.fixed_height_still.url);
	            personGif.attr('class', 'gif');
	            personGif.attr('data-state', 'still');
	            personGif.attr('data-animate', results[i].images.fixed_height.url);
	            personGif.attr('data-still', results[i].images.fixed_height_still.url);

	            gifDiv.append(h4);
	            gifDiv.append(personGif);

	            $('.gifsDiv').prepend(gifDiv);
	        }
        })
	});

	$(document).on('click', '.gif', function() {
		var state = $(this).attr('data-state');

      	var dataAnimateURL = $(this).attr('data-animate');
      	var dataStillURL = $(this).attr('data-still');

	    if (state === 'still') {
	    	$(this).attr('src', dataAnimateURL);
	        $(this).attr('data-state', 'animate');
	    }
	    else {
	        $(this).attr('src', dataStillURL);
	        $(this).attr('data-state', 'still');
	    }
	})

	$('.submit-btn').on('click', function () {
		topics.push($('input').val());
		createCelebBtns();
	});
});