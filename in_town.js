// Set up
var config = require("./config"); 
var request = require('request');
var twilio = require('twilio');
var client = new twilio.RestClient(config.account_sid, config.auth_token); 
var url = "http://api.bandsintown.com/artists/Chance%20the%20Rapper/events.json?api_version=2.0&app_id=Fareeds_App";

// make a get request to bandsintown api
request(url, function(error, response, body) {
   	process_response(body); 	
});

// this function will check if the response
// has locations in Maryland, Virginia or D.C. 
var process_response = function(body) {
	var json = JSON.parse(body);
   	var in_my_area, index = 1, tickets_available, get_tickets; 
	
	while (json[index] != undefined) {	
		var temp = json[index]; 
		in_my_area = temp.venue.region; 
		tickets_available = temp.ticket_status; 
		get_tickets = temp.ticket_url;

		if (in_my_area === "MD" && tickets_available === "available") {
			send_message("MD");	
		} 
		else if (in_my_area === "VA" && tickets_available === "available") {
			send_message("MD"); 	
		}	
		index++; 	
	}	
};

// This function makes an api call to twilio 
// in order to send an SMS message to the user
function send_message(state) {
	client.messages.create({
			to: "+12404779232", 
			from: "+13019442998", 
			body: "Chance the Rapper is coming to ",
	}, function(err, message) {
	    if (err) {
		console.error(err);
	    }
	    else {
		console.log(message.sid);
	    }
	});
}
