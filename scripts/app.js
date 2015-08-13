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
  ["jquery", "firebase", "hbs", "bootstrap", "populateHTML", "addMovie", "find-movies"], 
  function($, _firebase, Handlebars, bootstrap, populateHTML, addMovie, findMovies) {
    //firebase reference
    var myFirebaseRef = new Firebase("https://movie-project.firebaseio.com/movies");
    //firebase function fires everytime the page load or the data changes
    myFirebaseRef.orderByChild("title").on("value", function(snapshot) {
      require(['hbs!../templates/movieList'], function(movieTemplate) {
      //variable to store firbase data
        var movies = snapshot.val();
        console.log(snapshot.val());
        //populate html
        $('#movies').html(movieTemplate(movies));
        $(".movie-info").filter('[watched="false"]').show();
        $(".movie-info").filter('[watched="true"]').hide();
        $('.rating').filter('[watched="true"]').show();
        $('.watched-button').filter('[watched="true"]').hide();
        $('.rating').filter('[watched="false"]').hide();
        $('.watched-button').filter('[watched="false"]').show();
      });

    });//end firebase function

    var $modal = $('.modal').modal({
      show: false
    });

    $("#find-button").on('click', function(){
      findMovies.searchResults();
      $modal.modal('show');
    });

    //Delete Button
    $( document ).on( "click", "#deleteButton", function() {
      var titleKey = $(this).parent().parent().attr("key");
      console.log("titleKey", titleKey);
      var fb = new Firebase('https://movie-project.firebaseio.com/movies/' + titleKey);
      fb.remove();
    });

    $(".modal-body").on('click', '.add-button', function(){
      var addFB = $(this).parent().attr('key');
      addMovie.addMovie(addFB);
    });

    $("#watched").click(function() {
      $(".movie-info").filter('[watched="true"]').show();
      $(".movie-info").filter('[watched="false"]').hide();
      $("#wish").parent().removeClass('active');
    });

    $("#wish").click(function() {
      $(".movie-info").filter('[watched="false"]').show();
      $(".movie-info").filter('[watched="true"]').hide();
      $("#watched").parent().removeClass('active');
    });
    
  } //require js function
); //end require js module