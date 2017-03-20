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

	var results;
	var person;

	for (var i=0; i < topics.length; i++){
		var newBtn = $('<button class="btn btn-info btn-sm celeb-btn">' + topics[i] + '</button>');
		var celebName = topics[i].toLowerCase().replace(/\s/g, '');
		newBtn.attr('data-person', celebName);
		$('.buttonsDiv').append(newBtn);
	}

	$('body').on('click', '.celeb-btn', function(e) {
		e.preventDefault();

		person = $(this).attr('data-person');
		console.log(person);

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        	person + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax ({
        	url: queryURL,
        	method: 'GET'
        })
        .done(function(response) {
        	results = response.data;
        	
        	$('.gifsDiv').empty();

       		for (var i = 0; i < results.length; i++) {
	            var gifDiv = $('<div>');

	            var rating = results[i].rating;

	            var h4 = $('<h4>').text('Rating: ' + rating);

	            var personImage = $('<img>');
	            personImage.attr('src', results[i].images.fixed_height.url);

	            gifDiv.append(h4);
	            gifDiv.append(personImage);

	            $('.gifsDiv').prepend(gifDiv);
	        }
        })
	});

	$('.submit-btn').on('click', function () {
		var newCelebName = $('input').val().toLowerCase().replace(/\s/g, '');
		console.log(newCelebName);

		var newBtn = $('<button class="btn btn-info btn-sm celeb-btn">' + 
			$('input').val() + '</button>');

		newBtn.attr('data-person', newCelebName);
		$('.buttonsDiv').append(newBtn);
	});

	// function addGifs() {
	// 	$('.gifsDiv').empty();

 //       	for (var i = 0; i < results.length; i++) {
 //            var gifDiv = $('<div>');

 //            var rating = results[i].rating;

 //            var h4 = $('<h4>').text('Rating: ' + rating);

 //            var personImage = $('<img>');
 //            personImage.attr('src', results[i].images.fixed_height.url);

 //            gifDiv.append(h4);
 //            gifDiv.append(personImage);

 //            $('.gifsDiv').prepend(gifDiv);
	// 	}
	// }
});