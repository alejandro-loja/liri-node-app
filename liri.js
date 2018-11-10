var request = require('request')
var moment = require('moment');
require("./key.js")
var fs = require('fs');
require("dotenv").config();

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var query = process.argv.slice(3).join(" ");

console.log(query);