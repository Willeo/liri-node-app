require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var inquirer = require("inquirer");
var request = require("request");
var Spotify = require('node-spotify-api');

// var spotify = Spotify(keys);
console.log(keys);

const Twitter = require("twitter");
// const client = new Twitter(keys);

// user for music and movies selection
let options = process.argv[2];
let picks = process.argv.slice(3).join(" ");

console.log(options);

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
    omdbData();
    break;

  case "do-what-it-says":
    randoms();
    break;

  default:
    console.log(
      "Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says"
    );
}

var spotify = new spotify({
  id: 667e20e6081d4d97885123482ffb6c03,
  secret: 8d4f809423674b4bbe0cf1181acd3c8c
});

spotify.search({ type: "track", query: "All the Small Things" }, function(
  err,
  data
) {
  if (err) {
    return console.log("Error occurred: " + err);
  }

  console.log(data);
});
// // Twitter function
// function peepTweets() {
//   const screenName = { screen_name: "willeo" };
//   client.get("statuses/user_timeline", screenName, function(
//     error,
//     tweets,
//     response
//   ) {
//     if (!error) {
//       for (var i = 0; i < tweets.length; i++) {
//         var date = tweets[i].created_at;
//         console.log(
//           "@WilleoSmith: " +
//             tweets[i].text +
//             " Created At: " +
//             date.substring(0, 19)
//         );
//         console.log("-----------------------");

//         //adds text to log.txt file
//         fs.appendFile(
//           "log.txt",
//           "@WilleoSmith: " +
//             tweets[i].text +
//             " Created At: " +
//             date.substring(0, 19)
//         );
//         fs.appendFile("log.txt", "-----------------------");
//       }
//     } else {
//       console.log("Error occurred");
//     }
//   });
// }

//Imdb URL shortcut
// function omdbData(movie) {
//   let omdbURL =
//     "http://www.omdbapi.com/?t=" + movie + "&plot=short&tomatoes=true";
//   // Imdb request funciton
//   request(omdbURL, function(error, response, body) {
//     // If the request is successful
//     if (!error && response.statusCode === 200) {
//       console.log("The name of the movie is: " + JSON.parse(body).Title);
//       console.log(
//         "The year the movie was releaseed is: " + JSON.parse(body).Year
//       );
//       console.log("The imdb rating is: " + JSON.parse(body).imdbRating);
//       console.log(
//         "The Rotten Tomatoes ratings: " + JSON.parse(body).tomatoRating
//       );
//       console.log(
//         "The orgin country of the movie is: " + JSON.parse(body).Country
//       );
//       console.log("The language of the movie: " + JSON.parse(body).Language);
//       console.log("The plot of the movie is: " + JSON.parse(body).Plot);
//       console.log(
//         "The staring Actors of the movie are: " + JSON.parse(body).Actors
//       );
//       console.log("The movie's rating is: " + body);
//     } else {
//       console.log("Error occurred.");
//     }
//   });
//   //adds text to log.txt
//   fs.appendFile("log.txt", "Title: " + body.Title);
//   fs.appendFile("log.txt", "Release Year: " + body.Year);
//   fs.appendFile("log.txt", "IMdB Rating: " + body.imdbRating);
//   fs.appendFile("log.txt", "Country: " + body.Country);
//   fs.appendFile("log.txt", "Language: " + body.Language);
//   fs.appendFile("log.txt", "Plot: " + body.Plot);
//   fs.appendFile("log.txt", "Actors: " + body.Actors);
//   fs.appendFile("log.txt", "Rotten Tomatoes Rating: " + body.tomatoRating);
//   fs.appendFile("log.txt", "Rotten Tomatoes URL: " + body.tomatoURL);

//   if (movie === "Mr. Nobody") {
//     console.log("-----------------------");
//     console.log(
//       "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/"
//     );
//     console.log("It's on Netflix!");

//     //adds text to log.txt
//     fs.appendFile("log.txt", "-----------------------");
//     fs.appendFile(
//       "log.txt",
//       "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/"
//     );
//     fs.appendFile("log.txt", "It's on Netflix!");
//   }
// }

// Spotify function - GET https://api.spotify.com/v1/search

/* 
A comma-separated list of item types to search across. 
Valid types are: album , artist, playlist, and track. 
Search results include hits from all the specified item types. 
For example: q=name:abacab&type=album, 
track returns both albums and tracks with “abacab” 
included in their name.*/
