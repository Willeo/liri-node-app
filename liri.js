require("dotenv").config();
require("keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


