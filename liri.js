require("dotenv").config();

var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');
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

    case "concert-this":
        if (x) {
            findConcert(x);
        } else {
            findConcert("Bruno Mars");
        }
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
        console.log("{Please enter a command: concert-this, spotify-this-song, movie-this, do-what-it-says}");
        break;
}

function findConcert(artist) {

    request('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp', {
        json: true
    }, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        //name of the venue
        for (var i = 0; i < body.length; i++) {
            console.log("Venue Name: " + body[i].venue.name);
            //venue location
            console.log("Venue Location: " + body[i].venue.city + ", " + body[i].venue.country);
            //date of event(MM/DD/YYYY)
            console.log("Date of Event: " + moment(body[i].datetime).format('MM/DD/YYYY'));
            console.log("-----------------------");

            // adds text to log.txt
            fs.appendFile('log.txt', body[i].venue.name + '\n', (error) => { /* handle error */ });
            fs.appendFile('log.txt', body[i].venue.city + ", " + body[i].venue.country + '\n', (error) => { /* handle error */ });
            fs.appendFile('log.txt', moment(body[i].datetime).format('MM/DD/YYYY') + '\n', (error) => { /* handle error */ });
            fs.appendFile('log.txt', "-----------------------" + '\n', (error) => { /* handle error */ });
        }
    });
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

                // adds text to log.txt
                fs.appendFile('log.txt', songData.artists[0].name + '\n', (error) => { /* handle error */ });
                fs.appendFile('log.txt', songData.name + '\n', (error) => { /* handle error */ });
                fs.appendFile('log.txt', songData.preview_url + '\n', (error) => { /* handle error */ });
                fs.appendFile('log.txt', songData.album.name + '\n', (error) => { /* handle error */ });
                fs.appendFile('log.txt', "-----------------------" + '\n', (error) => { /* handle error */ });
            }
        } else {
            console.log('Error occurred.');
        }
    });
}