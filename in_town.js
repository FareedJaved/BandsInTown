// Set up
var request = require('request');
var url = "http://api.bandsintown.com/artists/Chance%20the%20Rapper/events.json?api_version=2.0&app_id=Fareeds_App";
var temp; 


// make a get request to bandsintown api
request(url, function(error, response, body) {
   	print_response(body); 	
});

// this function will check if the response has what i want
var print_response = function(body) {
	temp = JSON.parse(body);
	console.log(temp); 
};

