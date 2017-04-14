// Set up
var config = require("./config");
var request = require('request');
var twilio = require('twilio');
var client = new twilio.RestClient(config.account_sid, config.auth_token);
var url = "http://api.bandsintown.com/artists/Chance%20the%20Rapper/events.json?api_version=2.0&app_id=Fareeds_App";

// Get request to bandsintown api
request(url, function(error, response, body) {
   	process_response(body);
});

// This function will check if the JSON response
// contains Maryland as a tour destination
var process_response = function(body) {
	var json = JSON.parse(body);
   	var in_md, index = 1, tickets_available, get_tickets;

	while (json[index] != undefined) {
		var temp = json[index];
		in_md = temp.venue.region;
		tickets_available = temp.ticket_status;
		get_tickets = temp.ticket_url;

		if (in_md === "MD" && tickets_available === "available") {
			send_message("MD");
		}

		index++;
	}
};

// This function makes an api call to twilio
// in order to send an SMS message to the user
function send_message(state) {
	client.messages.create({
			to: config.my_num,
			from: config.twil_num,
			body: "Chance the Rapper is coming to " + state,
	}, function(err, message) {
	    if (err) {
		      console.error(err);
          console.log();
          console.log(config.twil_num)
	    }
	    else {
		      console.log(message.sid);
	    }
	});
}
