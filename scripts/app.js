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
    var myFirebaseRef = new Firebase("https://movie-project.firebaseio.com/");
    //firebase function fires everytime the page load or the data changes
    myFirebaseRef.on("value", function(snapshot) {
      require(['hbs!../templates/movieList'], function(movieTemplate) {
      //variable to store firbase data
        var movies = snapshot.val();
        
        //populate html
        $('#movies').html(movieTemplate(movies));
      });

    });//end firebase function

    var $modal = $('.modal').modal({
      show: false
    });

    $("#find-button").on('click', function(){
      findMovies.searchResults();
      $modal.modal('show');
    });
    $("#search-button").on('click', function(){
      var movieInput = $("#titleInput").val();
      if($(".movie-info").attr("title").indexOf(movieInput) !== -1) {
        $(this).show();
      }
        else {
          $(this).hide();
        }
    });

    $(".modal-body").on('click', '.add-button', function(){
      var addFB = $(this).parent().attr('key');
      addMovie.addMovie(addFB);
    });
    
  } //require js function
); //end require js module