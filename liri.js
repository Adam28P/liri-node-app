require("dotenv").config();

var keys = require('./keys.js');
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

var spotifyKeys = new spotify(keys.spotify);
var twitterKeys = new twitter(keys.twitter);

var nodeArgv = process.argv;
var command = process.argv[2];

var x = "";
//attaches multiple word arguments
for (var i = 3; i < nodeArgv.length; i++) {
    if (i > 3 && i < nodeArgv.length) {
        x = x + "+" + nodeArgv[i];
    } else {
        x = x + nodeArgv[i];
    }
}

//switch case
switch (command) {
    case "my-tweets":
        showTweets();
        break;

    case "spotify-this-song":
        if (x) {
            spotifySong(x);
        } else {
            spotifySong("Hotel California");
        }
        break;

    case "movie-this":
        if (x) {
            omdbData(x)
        } else {
            omdbData("Harry Potter")
        }
        break;

    case "do-what-it-says":
        doThing();
        break;

    default:
        console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
        break;
}