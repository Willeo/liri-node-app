require("dotenv").config();
let keys = require("./keys.js");
const fs = require("fs");
let inquirer = require("inquirer");
const request = require("request");

let spotify = require("node-spotify-api");

console.log(keys);

const Twitter = require("twitter");
const client = new Twitter(keys);
let options = process.argv[2];
// user for music and movies selection
let userInput = "";

switch (options) {
  //twitters Case
  case "my-tweets":
    peepTweets();
    break;
  // spotify case
  case "spotify-this-song":
    if (userInput) {
      spotifyMusic(userInput);
    } else {
      spotifyMusic("The Sign");
    }
    break;
  //Movie Case
  case "movie-this":
    if (userInput) {
      if (userInput.length === 0) {
        omdbData("Mr. Nobody");
      } else {
        omdbData(userInput);
      }
      break;
    }

  case "do-what-it-says":
    randoms();
    break;

  default:
    console.log(
      "{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}"
    );
    break;
}

// Twitter function
function peepTweets() {
  const screenName = { screen_name: "willeo" };
  client.get("statuses/user_timeline", screenName, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        var date = tweets[i].created_at;
        console.log(
          "@WilleoSmith: " +
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
      console.log("Error occurred");
    }
  });
}

//Imdb URL shortcut
function omdbData(movie) {
  let omdbURL =
    "http://www.omdbapi.com/?t=" + movie + "&plot=short&tomatoes=true";
  // Imdb request funciton
  request(omdbURL, function(error, response, body) {
    // If the request is successful
    if (!error && response.statusCode === 200) {
      console.log("The name of the movie is: " + JSON.parse(body).Title);
      console.log(
        "The year the movie was releaseed is: " + JSON.parse(body).Year
      );
      console.log("The imdb rating is: " + JSON.parse(body).imdbRating);
      console.log(
        "The Rotten Tomatoes ratings: " + JSON.parse(body).tomatoRating
      );
      console.log(
        "The orgin country of the movie is: " + JSON.parse(body).Country
      );
      console.log("The language of the movie: " + JSON.parse(body).Language);
      console.log("The plot of the movie is: " + JSON.parse(body).Plot);
      console.log(
        "The staring Actors of the movie are: " + JSON.parse(body).Actors
      );
      console.log("The movie's rating is: " + body);
    } else {
      console.log("Error occurred.");
    }
  });
  //adds text to log.txt
  fs.appendFile("log.txt", "Title: " + body.Title);
  fs.appendFile("log.txt", "Release Year: " + body.Year);
  fs.appendFile("log.txt", "IMdB Rating: " + body.imdbRating);
  fs.appendFile("log.txt", "Country: " + body.Country);
  fs.appendFile("log.txt", "Language: " + body.Language);
  fs.appendFile("log.txt", "Plot: " + body.Plot);
  fs.appendFile("log.txt", "Actors: " + body.Actors);
  fs.appendFile("log.txt", "Rotten Tomatoes Rating: " + body.tomatoRating);
  fs.appendFile("log.txt", "Rotten Tomatoes URL: " + body.tomatoURL);

  if (movie === "Mr. Nobody") {
    console.log("-----------------------");
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

// Spotify function
function spotifyMusic(song) {
  spotify.search({ type: "track", query: song }, function(error, data) {
    if (!error) {
      for (var i = 0; i < data.tracks.items.length; i++) {
        var songData = data.tracks.items[i];
        //artist
        console.log("Artist: " + songData.artists[0].name);
        //song name
        console.log("Song: " + songData.name);
        //spotify preview link
        console.log("Preview URL: " + songData.preview_url);
        //album name
        console.log("Album: " + songData.album.name);
        console.log("-----------------------");

        //adds text to log.txt
        fs.appendFile("log.txt", songData.artists[0].name);
        fs.appendFile("log.txt", songData.name);
        fs.appendFile("log.txt", songData.preview_url);
        fs.appendFile("log.txt", songData.album.name);
        fs.appendFile("log.txt", "-----------------------");
      }
    } else {
      console.log("Error occurred.");
    }
  });
}

function randoms() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    var txt = data.split(",");

    spotifySong(txt[1]);
  });
}
