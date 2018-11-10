var request = require('require.js')
var moment = require('moment.js');
require('key.js')
var fs = require('fs');

require("dotenv").config();

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var query = process.argv[3]