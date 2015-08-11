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

    putMoviesInHTML(movies);

    $("#search").click(function(){
      console.log("clicked");
      var userInput = $("#userInput").val().replace(/ /g, "+");
      $.ajax({
        url: "http://www.omdbapi.com/?t=" + userInput + "&r=json",
        method: "GET"
      }).done(function(data){
        putMoviesInHTML({'movies': [data]});
      });
      

    });






      
    });
  }
);