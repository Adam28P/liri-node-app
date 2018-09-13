require("dotenv").config();

var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);

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
        console.log("{Please enter a command: concert-this, spotify-this-song, movie-this, do-what-it-says}");
        break;
}

function spotifySong(song) {
    spotify.search({
        type: 'track',
        query: song
    }, function (error, data) {
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
                //   fs.appendFile('log.txt', songData.artists[0].name);
                //   fs.appendFile('log.txt', songData.name);
                //   fs.appendFile('log.txt', songData.preview_url);
                //   fs.appendFile('log.txt', songData.album.name);
                //   fs.appendFile('log.txt', "-----------------------");
            }
        } else {
            console.log('Error occurred.');
        }
    });
}