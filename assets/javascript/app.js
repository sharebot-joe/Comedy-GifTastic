$(document).ready(function() {
      // Global objects
      var apiKey = 'tj4h4gdxevqPIJTUM8kTJjt91EWJTm9D'
      var limit = 10
      var topics = ['Dave Chappelle', 'Dana Carvey', 'Jon Mulaney', 'Bill Hader', 'Robin Williams', 'Chris Rock', 'Louis CK', 'Aziz Ansari', 'Jerry Seinfeld', 'George Carlin']
      var queryBaseURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&limit=' + limit + '&q='
      var randomQueryBaseURL = 'https://api.giphy.com/v1/gifs/random?api_key=' + apiKey + '&tag='
      // Prototypes 
      // Converts a string to Title Case
      String.prototype.toTitleCase = function() {
        return this.replace(/\w\S*/g, function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      };
      // Functions
      function initializeButtons() {
        for (let text of topics)
          $('<button></button').text(text).addClass('btn btn-info').appendTo('.buttons')
      }

      // Main Program
      initializeButtons();

      //  When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
      $(document).on('click', '.buttons .btn', function() {
          var fired_button = $(this).text();
          console.log('this.text =====>', fired_button)

          var string = encodeURIComponent(fired_button);

          var queryURL = queryBaseURL + string ===
            === =
            for (let text of topics) $('<button></button').text(text).addClass('btn btn-info').appendTo('.buttons')
        }

        function firstTen(queryURL) {
          // ajax call 
          gif = $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            $('.main').empty();
            console.log('queryURL: ' + queryURL);
            console.log(response)
            // For each element of the response's data object...
            response.data.forEach(function(gifObject) {
              // Creating new div
              var gifDiv = $('<div class = \'gifdiv\'></div>')
              var rating = $('<p>Rating: ' + gifObject.rating + '</p>')
              //Creating placeholder image
              var img = $('<img>')
              img.attr({
                src: gifObject.images['480w_still'].url,
                height: 200,
                'data-animated': gifObject.images.fixed_height.url
              })
              // Bundle up new div
              gifDiv.append(rating)
              gifDiv.append(img)
              // Add new div to main section 
              $('.main').append(gifDiv)
            })
          })
        }

        // Main Program
        initializeButtons();


        //  When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
        $(document).on('click', '.buttons .btn', function() {
          var fired_button = $(this).text();
          var string = encodeURIComponent(fired_button);
          var queryURL = queryBaseURL + string

          // Adding data flag to +10 button
          $('input[value="+10"]').attr("data-query", fired_button);

          firstTen(queryURL);
        });

        $('input[value="Submit"]').on("click", function(event) {
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

        // Adds 10 more

        $('input[value="+10"]').on("click", function(event) {
          // Preventing the buttons default behavior when clicked (which is submitting a form)
          event.preventDefault();

          var query = $(this).attr('data-query');
          var string = encodeURIComponent(query);
          var randomQueryURL = randomQueryBaseURL + string;
          console.log(randomQueryURL)
          for (i = 0; i > 10; i++) {
            $.ajax({
              url: randomQueryURL,
              method: "GET"
            }).then(function(response) {
              console.log(response)
              // Creating new div
              var gifDiv = $('<div class = \'gifdiv\'></div>')
              // var rating = $('<p>Rating: ' + response.data.rating + '</p>')
              //Creating placeholder image
              var img = $('<img>')
              var url = 'https://media3.giphy.com/media/' + response.data.images['480w_still'].url
              console.log(url)
              img.attr({
                src: url,
                height: 200,
                'data-animated': response.data.images.fixed_height.url
              })
              // Bundle up new div
              // gifDiv.append(rating)
              gifDiv.append(img)
              // Add new div to main section 
              $('.main').append(gifDiv)
            })
          }

          // for (i = 0; i > 10; i++) {
          //   // ajax call 
          //   $.ajax({
          //     url: randomQueryURL,
          //     method: "GET"
          //   }).then(function(response) {
          //     console.log('random gif response' + response)
          //     // Creating new div
          //     var gifDiv = $('<div class = \'gifdiv\'></div>')
          //     var rating = $('<p>Rating: ' + response.rating + '</p>')
          //     //Creating placeholder image
          //     var img = $('<img>')
          //     img.attr({
          //       src: response.images['480w_still'].url,
          //       height: 200
          //     })
          //     // Bundle up new div
          //     gifDiv.append(rating)
          //     gifDiv.append(img)
          //     // Add new div to main section 
          //     $('.main').append(gifDiv)
          //   })
          // }
        })

        // Function that toggles gif playback via click
        $(document).on('click', 'img', function() {
          var currentState = $(this).attr('src')
          var nextState = $(this).attr('data-animated')
          $(this).attr('src', nextState)
          $(this).attr('data-animated', currentState)
        });
        // End Document Ready
      });