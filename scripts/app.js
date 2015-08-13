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
  ["jquery", "firebase", "hbs", "bootstrap", "dom-access", "populateHTML", "addMovie", "movieEdit", "badges"], 
  function($, _firebase, Handlebars, bootstrap, D, populateHTML, addMovie, movieEdit, badges) {
    //firebase reference
    var myFirebaseRef = new Firebase("https://movie-history.firebaseio.com/");
    //firebase function fires everytime the page load or the data changes
    myFirebaseRef.on("value", function(snapshot) {
      //variable to store firbase data
      var movies = snapshot.val();
      
      //populate html
      populateHTML.putSeenMoviesInHTML(movies);
      populateHTML.putToSeeMoviesInHTML(movies);
      badges.populateBadges(movies);

      ///////////DOM EVENT FUNCTIONS////////// 
      //click to display search results on click or return
      D.searchButton.click(function(e) {
        e.preventDefault();
        addMovie.getMovieData();
      });
      //send search data to firebase
      D.body.on('click', "#addMovie", addMovie.addMovieToFirebase);
      //delete movie
      D.body.on('click', "#delete", movieEdit.deleteMovie);
      //seen movie change
      D.body.on('click', "#seen", movieEdit.seenMovie);
      //open change rating dialog box
      D.body.on('click', "#change", movieEdit.changeMovie);
      //submit new rating
      D.body.on('click', "#newRatingBtn", movieEdit.submitRating);

    });//end firebase function

    var $modal = $('.modal').modal({
      show: false
    });
    
  } //require js function
); //end require js module