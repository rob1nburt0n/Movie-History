requirejs.config({
  baseUrl: './scripts',
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
  ["jquery", "firebase", "hbs", "bootstrap", "dom-access", "populateHTML", "addMovie", "movieEdit"], 
  function($, _firebase, Handlebars, bootstrap, D, populateHTML, addMovie, movieEdit) {
    //firebase reference
    var myFirebaseRef = new Firebase("https://movie-history.firebaseio.com/");
    //firebase function fires everytime the page load or the data changes
    myFirebaseRef.on("value", function(snapshot) {
      //variable to store firbase data
      var movies = snapshot.val();
      console.log("Movies object: ", movies);

      //populate the html with firebase data run through handlebars
      populateHTML.putSeenMoviesInHTML(movies);

      //display search results
      $("#search").click(addMovie.getMovieData);

      //send search data to firebase
      $("body").on('click', "#addMovie", addMovie.addMovieToFirebase);

      //delete movie
      $("body").on('click', "#delete", movieEdit.deleteMovie);

      //seen movie change
      $("body").on('click', "#seen", movieEdit.seenMovie);

    });//end firebase function
  } //require js function
); //end require js module