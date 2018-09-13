// initalize variables
require("dotenv").config();

// get data from keys
var keys = require('./keys.js');

// require npm packages
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);

// console input for user
var nodeArgv = process.argv;
var command = process.argv[2];

var x = "";

//attaches multiple words together in a string on the same line in console
for (var i = 3; i < nodeArgv.length; i++) {
    if (i > 3 && i < nodeArgv.length) {
        x = x + "+" + nodeArgv[i];
    } else {
        x = x + nodeArgv[i];
    }
}

//switch case for each different command
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

// function for 'concert-this'
function findConcert(artist) {
    request('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp', {
        json: true
    }, (err, res, body) => {
        if (err) {
            console.log('Error occurred.');
        }
        //name of the venue
        for (var i = 0; i < body.length; i++) {
            console.log("---------- CONCERT-THIS ----------");
            // console.log response to user
            console.log("Venue Name: " + body[i].venue.name);
            //venue location
            console.log("Venue Location: " + body[i].venue.city + ", " + body[i].venue.country);
            //date of event(MM/DD/YYYY)
            console.log("Date of Event: " + moment(body[i].datetime).format('MM/DD/YYYY'));
            console.log("-----------------------");

            // adds text to log.txt
            fs.appendFile('log.txt', "---------- CONCERT-THIS ----------" + '\n', (error) => { /* handle error */ });
            fs.appendFile('log.txt', body[i].venue.name + '\n', (error) => { /* handle error */ });
            fs.appendFile('log.txt', body[i].venue.city + ", " + body[i].venue.country + '\n', (error) => { /* handle error */ });
            fs.appendFile('log.txt', moment(body[i].datetime).format('MM/DD/YYYY') + '\n', (error) => { /* handle error */ });
            fs.appendFile('log.txt', "-----------------------" + '\n', (error) => { /* handle error */ });
        }
    });
}

// function for 'spotify-this-song'
function spotifySong(song) {
    spotify.search({
        type: 'track',
        query: song
    }, function (error, data) {
        if (!error) {
            for (var i = 0; i < data.tracks.items.length; i++) {
                // console.log response to user
                var songData = data.tracks.items[i];
                console.log("---------- SPOTIFY-THIS-SONG ----------");
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
                fs.appendFile('log.txt', "---------- SPOTIFY-THIS-SONG ----------" + '\n', (error) => { /* handle error */ });
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

// function for 'movie-this'
function omdbData(movie) {

    request('http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true&apikey=trilogy', {
        json: true
    }, (err, res, body) => {
        if (err) {
            console.log('Error occurred.');
        }

        // console.log response to user
        console.log("---------- MOVIE-THIS ----------");
        console.log("Movie Title: " + body.Title);
        console.log("Release Year: " + body.Year);
        console.log("IMDB Rating: " + body.imdbRating);
        console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
        console.log("Country: " + body.Country);
        console.log("Language: " + body.Language);
        console.log("Plot: " + body.Plot);
        console.log("Actors: " + body.Actors);

        //adds text to log.txt
        fs.appendFile('log.txt', "---------- MOVIE-THIS ----------" + '\n', (error) => { /* handle error */ });
        fs.appendFile('log.txt', "Title: " + body.Title + '\n', (error) => { /* handle error */ });
        fs.appendFile('log.txt', "Release Year: " + body.Year + '\n', (error) => { /* handle error */ });
        fs.appendFile('log.txt', "IMDB Rating: " + body.imdbRating + '\n', (error) => { /* handle error */ });
        fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.Ratings[1].Value + '\n', (error) => { /* handle error */ });
        fs.appendFile('log.txt', "Country: " + body.Country + '\n', (error) => { /* handle error */ });
        fs.appendFile('log.txt', "Language: " + body.Language + '\n', (error) => { /* handle error */ });
        fs.appendFile('log.txt', "Plot: " + body.Plot + '\n', (error) => { /* handle error */ });
        fs.appendFile('log.txt', "Actors: " + body.Actors + '\n', (error) => { /* handle error */ });
        fs.appendFile('log.txt', "-----------------------" + '\n', (error) => { /* handle error */ });

    });
}

// function for 'do-what-it-says'
function doThing() {
    fs.readFile('random.txt', "utf8", function (error, data) {
        var txt = data.split(',');
        spotifySong(txt[1]);
    });
}