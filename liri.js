var request = require('request');
var Spotify = require('node-spotify-api');
require("dotenv").config();
var moment = require('moment');
var keys = require("./key.js")
var fs = require('fs');


var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var query = process.argv.slice(3).join(" ");

if (command === 'do-what-it-says') {
    console.log("\nloading");
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(err);
        }
        // console.log(data)
        var dataSplit = data.split(",");
        command = dataSplit[0];
        console.log(command);
        query = dataSplit[1];
        console.log(query);
        searchthis();
    });
} else {
    searchthis();
};

function concertthis() {
    if (query === ""){
        query = 'Metallica';
    }
    console.log("\nSearching for Concerts...");
    request("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp", function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var body = JSON.parse(body);
        console.log('\nConcerts for ' + query);
        for (var i = 0; i < 3; i++) {
            console.log('\n-------------\n');
            var concert = body[i];
            var venueInfo = concert.venue;

            var venueName = venueInfo.name;
            var location = venueInfo.city + ", " + venueInfo.region;
            var date = concert.datetime;
            var newDate = moment(date).format('LL')

            console.log('Name of Venue: ' + venueName);
            console.log('Location: ' + location);
            console.log('Date: ' + newDate);
            console.log('\n-------------');
        }
    });
};
function spotifythis() {
    if (query === ""){
        query = 'Hotel California';
    }
    console.log("\nSearching for Song...");
    spotify.search({ type: 'track', query: query }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var spotifyObj = data.tracks.items[0];

        var songArtistName = spotifyObj.artists[0].name;
        var songName = spotifyObj.name;
        var songLink = spotifyObj.external_urls.spotify;
        var songAlbum = spotifyObj.album.name;

        console.log('\n-------------\n');
        console.log('Name of song: ' + songName);
        console.log('Artist: ' + songArtistName);
        console.log('Name of Album: ' + songAlbum);
        console.log('Spotify Link to Song: ' + songLink);
        console.log('\n-------------\n');
    });
};
function moviethis() {
    if (query === ""){
        query = 'Mr. Nobody';
    }
    console.log("\nSearching for Movie...");
    var apikey = 'trilogy';
    request("http://www.omdbapi.com/?apikey=" + apikey + "&t=" + query, function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var body = JSON.parse(body);
        var movieObj = body;

        var movieTitle = movieObj.Title;
        var movieYear = movieObj.Year;
        var movieImdbRatingSor = movieObj.Ratings[0].Source;
        var movieImdbRatingVal = movieObj.Ratings[0].Value;
        var movieRottenTRatingSor = movieObj.Ratings[1].Source;
        var movieRottenTRatingVal = movieObj.Ratings[1].Value;
        var movieCountry = movieObj.Country;
        var movieLanguage = movieObj.Language;
        var moviePlot = movieObj.Plot;
        var movieActors = movieObj.Actors;
        console.log('\n-------------\n');
        console.log('Movie Title: ' + movieTitle);
        console.log('Year: ' + movieYear);
        console.log('Starring: ' + movieActors);
        console.log('Country: ' + movieCountry);
        console.log('Language: ' + movieLanguage);
        console.log(movieImdbRatingSor + ": " + movieImdbRatingVal);
        console.log(movieRottenTRatingSor + ": " + movieRottenTRatingVal);
        console.log('Plot: ' + moviePlot);
        console.log('\n-------------\n');
    });
};

function searchthis() {
    if (command === 'concert-this') {
        concertthis();
    }
    else if (command === 'spotify-this-song') {
        spotifythis();
    }
    else if (command === 'movie-this') {
        moviethis();
    }
    else {
        console.log('\nPlease enter a command after "liri.js" such as: \nconcert-this, spotify-this-song, movie-this,  do-what-it-says\n');
    }
};

