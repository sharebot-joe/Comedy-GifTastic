$(document).ready(function() {
	// Global objects
  var apiKey = 'tj4h4gdxevqPIJTUM8kTJjt91EWJTm9D'
	var limit = 10
	var topics = ['Dave Chappelle', 'Dana Carvey', 'Jon Mulaney', 'Bill Hader', 'Robin Williams', 'Chris Rock', 'Louis CK', 'Aziz Ansari', 'Jerry Seinfeld', 'George Carlin']
	var queryBaseURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&limit=' + limit + '&q='
	
  // Prototypes 
  // Converts a string to Title Case
  String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };
  // Functions

  function initializeButtons() {
	for (let text of topics)
  	$('<button></button').text(text).addClass('btn btn-info').appendTo('.buttons')
	}

	// Main Program
	initializeButtons();

	// 	When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
	$(document).on('click', '.buttons .btn', function() {
    var fired_button = $(this).text();
   
    var string = encodeURIComponent(fired_button);
   
    var queryURL = queryBaseURL + string

    // ajax call 
    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).then(function(response) {
        $('.main').empty();
    	console.log('queryURL: ' + queryURL);
    	console.log(response)

        // For each element of the response's data object...
    	response.data.forEach(function(gifObject){

            // Creating new div
    		var gifDiv = $('<div class = \'gifdiv\'></div>')

    		var rating = $('<p>Rating: ' + gifObject.rating + '</p>')
    		
            //Creating placeholder image
    		var img = $('<img>')
    		img.attr({src:gifObject.images['480w_still'].url, height:200})

            // Function that toggles gif playback via click
    		img.click(function() {
                var currentSrc = img.attr('src')
                var stillURL = gifObject.images['480w_still'].url
    			var gifURL = gifObject.images.fixed_height.url

                if (currentSrc.endsWith('jpg')) {
                    img.attr('src', gifURL)
                } else if (currentSrc.endsWith('gif')) {
                    img.attr('src', stillURL)
                }
            });

            // Bundle up new div
			  gifDiv.append(rating)
    		gifDiv.append(img)

            // Add new div to main section 
    		$('.main').append(gifDiv)
    		
    	})
    })
  });

  $('input[type="submit"]').on("click", function(event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    
    var input = $("#userinput").val().trim();
    console.log(input)
    // This line checks for input from the textbox
    if (input != '' && input != $("#userinput").defaultValue) {
      
      // Make new queryURL
      var string = encodeURIComponent(input);
      var queryURL = queryBaseURL + string
      console.log('new queryURL: ' + queryURL)

      // ajax call 
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        topics.push(input.toTitleCase())
        console.log(topics)
        $('.buttons').empty();
        initializeButtons();
      })
    }
  });
      //   $('.main').empty();
      //   console.log('queryURL: ' + queryURL);
      //   console.log(response)

      //     // For each element of the response's data object...
      //   response.data.forEach(function(gifObject){

      //         // Creating new div
      //     var gifDiv = $('<div class = \'gifdiv\'></div>')

      //     var rating = $('<p>Rating: ' + gifObject.rating + '</p>')
          
      //         //Creating placeholder image
      //     var img = $('<img>')
      //     img.attr({src:gifObject.images['480w_still'].url, height:200})

      //         // Function that toggles gif playback via click
      //     img.click(function() {
      //             var currentSrc = img.attr('src')
      //             var stillURL = gifObject.images['480w_still'].url
      //       var gifURL = gifObject.images.fixed_height.url

      //             if (currentSrc.endsWith('jpg')) {
      //                 img.attr('src', gifURL)
      //             } else if (currentSrc.endsWith('gif')) {
      //                 img.attr('src', stillURL)
      //             }
      //         });

      //         // Bundle up new div
      //     gifDiv.append(rating)
      //     gifDiv.append(img)

      //         // Add new div to main section 
      //     $('.main').append(gifDiv)
          
      //   })
      // })
      // Adding the input from the textbox to our array
      

    
    // $('<button></button').text(text).addClass('btn btn-info').appendTo('.buttons')
    // // Calling renderButtons which handles the processing of our movie array
    // renderButtons();


// Only once you get images displaying with button presses should you move on to the next step.

// Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.


});