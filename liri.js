require("dotenv").config();

var keys = require('./keys.js');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

var spotifyKeys = new Spotify(keys.spotify);
var twitterKeys = new twitter(keys.twitter);

