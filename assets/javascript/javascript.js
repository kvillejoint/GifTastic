$(document).ready(function() {

	console.log($("#buttonHolder")[0])
	//Variable initial array of topics (as strings)
	var topics = ["Deadpool", "Batman", "Wolverine"];
	//function to capture topic name from user input
	function getTopicName () {
		var topicName = $(this).attr("data-topic");
	}
	//function to display topic as button in HTML
	function renderButtons () {
		//empties div to show gifs before adding new entries (stops button repetition)
		$("#buttonHolder").empty();
		//for loop to cycle through topics array for button values
		for (var i = 0; i < topics.length; i++) {
			//jQuery to create buttons
			var a = $("<button>");
			//add class to button
			a.addClass("topic");
			//add data-attribute to button
			a.attr("data-topic", topics[i]);
			//add text to button
			a.text(topics[i]);
			//append button to HTML document
			$("#buttonHolder").append(a);
		}
	}
	//click listener and function to create buttons after Submit is clicked
	$("#add-topic").on("click", function(event) {
		//prevent default behavior on button click
		event.preventDefault();
		//pull value from input and trim extra space
		var userInput = $("#topic-input").val().trim();
		//push userInput into array
		topics.push(userInput);
		//run function to create buttons from string items in array
		renderButtons();
	});

	//prevents deletion of new  buttons upon button click
	$(document).on("click", ".topic", function(event) {
		event.preventDefault();
		var topic = $(this).attr("data-topic");
		console.log(this);
		//creating variable for URL with API key included (added limit=10 to show 10 gifs)
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10"
		//perform AJAX request for data from giphyAPI
		$.ajax({
			url: queryURL,
			method: "GET"
		})
		//when AJAX is done, run this function for responses
		.done(function(response) {
			console.log(response);
		//variable to pull response data and assign to variable
			var results = response.data;
			console.log(results);
			//for loop to cycle through the results
			for (var i = 0; i < results.length; i++) {
			 	//create new div for gifs in results
				var gifDiv = $("<div>");
				gifDiv.addClass("item");
				//variable for getting gif rating
				//var rating = results[i].rating;
				//console.log(rating);
			 	//variable to create "p" tag for the rating
				var p = $("<p>").text("Rating: " + results[i].rating);
				//variable for the creating image
				var topicImage = $("<img>");
			 		//these lines add attributes for the image
			 		topicImage.attr("class", "image");
					topicImage.attr("src", results[i].images.fixed_height.url);
					//adding attributes for animating gifs - still vs animate URLs
					topicImage.attr("data-state", "still");
					topicImage.attr("data-still", results[i].images.fixed_height_still.url)
					topicImage.attr("data-animate", results[i].images.fixed_height.url)

				 	//prepend the gif and rating
				gifDiv.prepend(p);
				gifDiv.prepend(topicImage);
				//add the gifs generated into the empty div in the HTML
				$("#gifs-appear-here").prepend(gifDiv);
			}
			//event listener to change gif state for toggle
			$(".image").on("click", function() {
				//variable for data-state of gif image
    			var gifState = $(this).attr("data-state");
    			//check on change of data-state
    			console.log("gif data-state: " + state);
    			console.log("this is: " + this);
    			//if statement that changes data-state to still or animate based on current state
    			if (gifState === "still") {
			        $(this).attr("src", $(this).attr("data-animate"));
			        $(this).attr("data-state", "animate");
			    } else {
			        $(this).attr("src", $(this).attr("data-still"));
			        $(this).attr("data-state", "still");
			    }
			});
		});
	});
});