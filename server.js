const express = require('express')
const app = express()
const request = require('request'); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});    




app.get('/', function (req, res) {
 
let url = `http://api.bandsintown.com/artists/${req.query.artist}/events.json?api_version=2.0&app_id=Fareeds_App`;
request(url, function(error, response, body) {
   	res.json(JSON.parse(body));
});

  
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
