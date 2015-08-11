requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery'], //makes sure jquery is loaded before bootstrap
    'firebase': {
      exports: 'Firebase'
    }
  }
});

requirejs(
  ["jquery", "firebase", "hbs", "bootstrap"], 
  function($, _firebase, Handlebars, bootstrap) {

    //firebase reference
    var myFirebaseRef = new Firebase("https://movie-history.firebaseio.com/");

    myFirebaseRef.on("value", function(snapshot) {

      var movies = snapshot.val();
      console.log("Movies object: ", movies);

      var putMoviesInHTML = function (data) {
        require(['hbs!../templates/movies'],function(movieTemplate){
          $("#movies").html(movieTemplate(data));
        });
      };

      var putSearchInHTML = function (data) {
        require(['hbs!../templates/addMovie'],function(movieTemplate){
          $("#movies").html(movieTemplate(data));
        });
      };

      putMoviesInHTML(movies);

      //variable to store ajax call data
      var movieSearchData;
      //search function that gets movie info from omdb api
      $("#search").click(function(){
        console.log("clicked");
        var userInput = $("#userInput").val().replace(/ /g, "+");
        $.ajax({
          url: "http://www.omdbapi.com/?t=" + userInput + "&r=json",
          method: "GET"
        }).done(function(data){
          movieSearchData = data;
          putSearchInHTML({'movies': [data]});
        });      
    
      });

      //gets movie info from previous ajax call and sends it to firebase
      $("body").on('click', "#addMovie", function(){
        var newMovie = {
          "Title": movieSearchData.Title,
          "Year": movieSearchData.Year,
          "Actors": movieSearchData.Actors,
          "imdbRating": movieSearchData.imdbRating,
          "Seen": false
        };

        $.ajax({
        url: "https://movie-history.firebaseio.com/movies.json",
        method: "POST",
        data: JSON.stringify(newMovie)
        });
      }); //add movie function ends

      $("body").on('click', "#delete", function(){
        console.log('delete clicked');
        var thisMovie = $(this).parent().attr('id');
        $.ajax({
        url: "https://movie-history.firebaseio.com/movies/" + thisMovie + ".json",
        method: "DELETE"
        });
      }); //end delete button function

    });//end firebase function
  } //require js function
); //end require js module