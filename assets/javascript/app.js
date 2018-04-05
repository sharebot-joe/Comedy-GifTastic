$(document).ready(function() {
	var apiKey = 'tj4h4gdxevqPIJTUM8kTJjt91EWJTm9D'
	var limit = 10
	var topics = ['Dave Chappelle', 'Dana Carvey', 'Jon Mulaney', 'Bill Hader', 'Robin Williams', 'Chris Rock', 'Louis CK', 'Aziz Ansari', 'Jerry Seinfeld', 'George Carlin']
	var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&limit=' + limit + '&q='
	function initializeButtons() {
		for (let text of topics)
  		$('<button></button').text(text).addClass('btn btn-info').appendTo('.buttons')
	}

	// Main Program
	initializeButtons();

	// 	When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
	 $(document).on('click', '.btn', function() {
    fired_button = $(this).text();
   
    var string = encodeURIComponent(fired_button);
   
    queryURL = queryURL + string
    // ajax call 
    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).then(function(response) {
    	console.log('queryURL: ' + queryURL);
    	console.log(response)
    	response.data.forEach(function(gifObject){

    		var gifDiv = $('<div class = \'gifdiv\'></div>')

    		var rating = $('<p>Rating: ' + gifObject.rating + '</p>')
    		
    		var img = $('<img>')
    		img.attr('src', gifObject.images['480w_still'].url)
    		img.click(function() {
    			var gifURL = gifObject.images.fixed_height.url
					img.attr("data-gif", gifURL);
					img.attr("id", "gif-img");
					var tempUrl = img.attr("data-gif");
					$("#gif-img").attr("data-gif") = $("#gif-img").attr("src");	
					$("#gif-img").attr("src") = tempUrl;
				});

				gifDiv.append(rating)
    		gifDiv.append(img)

    		$('.main').append(gifDiv)
    		// Toggles playback of gif via button click
				// $('.gifdiv').click(function() {
				// 	killerImg.attr("data-gif", gifURL);
				// 	killerImg.attr("id", "killer-img");
				// 	var tempUrl = $("#killer-img").attr("data-gif");
				// 	$("#killer-img").attr("data-gif") = $("#killer-img").attr("src");	
				// 	$("#killer-img").attr("src") = tempUrl
				// });
    		
    	})
    })
  });


// Only once you get images displaying with button presses should you move on to the next step.

// Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.


});