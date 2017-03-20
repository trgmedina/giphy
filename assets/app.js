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

	var gifURL;
	var gifStillURL;

	for (var i=0; i < topics.length; i++){
		var newBtn = $('<button class="btn btn-info btn-sm celeb-btn">' + topics[i] + '</button>');
		var celebName = topics[i].toLowerCase().replace(/\s/g, '');
		newBtn.attr('data-person', celebName);
		$('.buttonsDiv').append(newBtn);
	}

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
	            personGif.attr('src', results[i].images.fixed_height.url);
	            personGif.attr('class', 'gif');
	            personGif.attr('data-state', 'animate');
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
      	console.log(state);

      	var dataAnimateURL = $(this).attr('data-animate');
      	var dataStillURL = $(this).attr('data-still');

	    if (state === 'animate') {
	    	$(this).attr('src', dataStillURL);
	        $(this).attr('data-state', 'still');
	    }
	    else {
	        $(this).attr('src', dataAnimateURL);
	        $(this).attr('data-state', 'animate');
	    }
	})

	$('.submit-btn').on('click', function () {
		var newCelebName = $('input').val().toLowerCase().replace(/\s/g, '');
		console.log(newCelebName);

		var newBtn = $('<button class="btn btn-info btn-sm celeb-btn">' + 
			$('input').val() + '</button>');

		newBtn.attr('data-person', newCelebName);
		$('.buttonsDiv').append(newBtn);
	});
});