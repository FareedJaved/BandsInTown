require 'net/http' 
require 'json' 

request = "http://api.bandsintown.com/artists/Chance%20the%20Rapper/events.json?api_version=2.0&app_id=Fareeds_App"

uri = URI(request)
response = Net::HTTP.get(uri)

# My response is an array of hashes
my_hash = JSON.parse(response)

# This function takes in array of 
# hashes and checks each hash if 
# the region key is mapped to "MD"
# Calls Twilio api to send message 
# to user
def in_maryland(hash)
	

end

