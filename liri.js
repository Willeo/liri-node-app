require('dotenv').config()
const fs = require('fs');
const keys = require('./keys.js');
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');




// user input for music and movies selection
let options = process.argv[2];
let picks = process.argv.slice(3).join(" ");



switch (options) {
  //twitters Case
  case "my-tweets":
    peepTweets();
    break;
    // spotify case
  case "spotify-this-song":
    console.log("Spotty");
    spotifyMusic(picks);
    break;
    //Movie Case
  case "movie-this":
    if (picks === 0) {
      nobody();
    } else {
      moveTime(picks);
    }
    break;

  case "do-what-it-says":
    doWhatItSays
    break;

  default:
    console.log(
      "Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says"
    );
}





// spotify function
function spotifyMusic(picks) {
  let spotify = new Spotify(keys.spotifyKeys);

  if (!picks) {
    picks = "The Sign";
  }

  spotify.search({
    type: 'track',
    query: songName
  }, function (err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    } else {
      output = space + "================= LIRI FOUND THIS FOR YOU...==================" +
        space + "Song Name: " + "'" + songName.toUpperCase() + "'" +
        space + "Album Name: " + data.tracks.items[0].album.name +
        space + "Artist Name: " + data.tracks.items[0].album.artists[0].name +
        space + "URL: " + data.tracks.items[0].album.external_urls.spotify + "\n\n\n";
      console.log(output);

      fs.appendFile("log.txt", output, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    };
  });
}





// // Twitter function
function peepTweets() {
  var client = new Twitter(keys.twitterKey);
  const screenName = {
    screen_name: "willeoSmith"
  };

  client.get("statuses/user_timeline", screenName, function (
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        var date = tweets[i].created_at;
        console.log(
          "WilleoSmith: " +
          tweets[i].text +
          " Created At: " +
          date.substring(0, 19)
        );
        console.log("-----------------------");

        //adds text to log.txt file
        fs.appendFile(
          "log.txt",
          "@WilleoSmith: " +
          tweets[i].text +
          " Created At: " +
          date.substring(0, 19)
        );
        fs.appendFile("log.txt", "-----------------------");
      }
    } else {
      console.log("Error occurred" + error);
    }
  });
}






//Imdb URL shortcut
function moveTime(picks) {
  let omdbURL =
    "http://www.omdbapi.com/?t=" + picks + "&y=&plot=short&apikey=33981212";
  // Imdb request funciton
  request(omdbURL, function (error, response, body) {
    console.log(body);
    let jsonData = JSON.parse(body);

    console.log(jsonData);
    // If the request is successful
    if (!error && response.statusCode === 200) {
      console.log("The name of the movie is: " + jsonData.Title);
      console.log("The year releaseed is: " + jsonData.Year);
      console.log("Imdb rating is: " + jsonData.imdbRating);
      console.log("Rotten Tomatoes gave it: " + jsonData.tomatoRating);
      console.log("The orgin country: " + jsonData.Country);
      console.log("The language of the movie: " + jsonData.Language);
      console.log("The plot: " + jsonData.Plot);
      console.log("The Actors are: " + jsonData.Actors);
      console.log("The movie's rating is: " + body);

    } else {

      console.log("Error occurred.");

    }
    //adds text to log.txt
    fs.appendFile("log.txt", "Title: " + jsonData.Title);
    fs.appendFile("log.txt", "Release Year: " + jsonData.Year);
    fs.appendFile("log.txt", "IMdB Rating: " + jsonData.imdbRating);
    fs.appendFile("log.txt", "Country: " + jsonData.Country);
    fs.appendFile("log.txt", "Language: " + jsonData.Language);
    fs.appendFile("log.txt", "Plot: " + jsonData.Plot);
    fs.appendFile("log.txt", "Actors: " + jsonData.Actors);
    fs.appendFile("log.txt", "Rotten Tomatoes Rating: " + jsonData.tomatoRating);
    fs.appendFile("log.txt", "Rotten Tomatoes URL: " + jsonData.tomatoURL);

  });

  function nobody() {
    if (picks === "Mr. Nobody") {

      console.log(
        "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/"
      );
      console.log("It's on Netflix!");

      //adds text to log.txt
      fs.appendFile("log.txt", "-----------------------");
      fs.appendFile(
        "log.txt",
        "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/"
      );
      fs.appendFile("log.txt", "It's on Netflix!");
    }

  }

  let doWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
      console.log(data);
      writeToLog(data);
      let dataArr = data.split(',')

      if (dataArr.length == 2) {
        pick(dataArr[0], dataArr[1]);
      } else if (dataArr.length == 1) {
        pick(dataArr[0]);
      }

    });
  }
}