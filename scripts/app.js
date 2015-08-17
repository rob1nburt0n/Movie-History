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
  ["jquery", "firebase", "hbs", "lodash", "bootstrap", "populateHTML", "addMovie", "find-movies"], 
  function($, _firebase, Handlebars, _, bootstrap, populateHTML, addMovie, findMovies) {
    //firebase reference
    var myFirebaseRef = new Firebase("https://movie-project.firebaseio.com/movies");
    //firebase function fires everytime the page load or the data changes

    myFirebaseRef.once("value", function(snapshot) {
      require(['hbs!../templates/movieList'], function(movieTemplate) {
      //variable to store firbase data
        populateHTML.displayMovies();
      });
    });


    //Search Button
    $("#search-button").on('click', function(){
      require(['hbs!../templates/find'], function(findTemplate) {
        $('.search-results').remove();
        var movieInput = $("#titleInput").val().toLowerCase();
        $(".movie-info").filter('[title*="'+ movieInput + '"]').show();
        $(".movie-info").not('[title*="'+ movieInput + '"]').hide();
        findMovies.searchResults();
        $("#buttonGroups").css('display', 'block');
      });
    });

    //Radio Watched Button
    $('#radio-watched').on('click', function(){
      var movieInput = $("#titleInput").val().toLowerCase();
      $(".movie-info").filter('[watched="false"]').hide();
      $(".movie-info").filter('[watched="true"]').show();
      $(".search-results").hide();
      $(".movie-info").not('[title*="'+ movieInput + '"]').hide();
    });

    //Radio Wish Button
    $('#radio-wish').on('click', function(){
      var movieInput = $("#titleInput").val().toLowerCase();
      $(".movie-info").filter('[watched="true"]').hide();
      $(".movie-info").filter('[watched="false"]').show();
      $(".search-results").hide();
      $(".movie-info").not('[title*="'+ movieInput + '"]').hide();
    });

    //Radio Add Button
    $('#radio-add').on('click', function(){
      var movieInput = $("#titleInput").val();
      $(".movie-info").filter('[watched="false"]').hide();
      $(".movie-info").filter('[watched="true"]').hide();
      $(".search-results").show();
    });

    //Delete Button
    $( document ).on( "click", "#deleteButton", function() {
      var titleKey = $(this).parent().parent().attr("key");
      console.log("titleKey", titleKey);
      var fb = new Firebase('https://movie-project.firebaseio.com/movies/' + titleKey);
      fb.remove();
      populateHTML.displayMovies();
    });


    //Add Button
    $("#movies").on('click', '.addButton', function(){
      var addFB = $(this).parent().attr('key');
      addMovie.addMovie(addFB);
      $(this).attr('disabled','disabled');
    });

    //Wish List
    $("#wish").click(function() {
      $(".movie-info").filter('[watched="false"]').show();
      $(".movie-info").filter('[watched="true"]').hide();
      $("#watched").parent().removeClass('current');
      $('#wish').parent().addClass('current');
      $("#buttonGroups").hide();
      $(".search-results").hide();
      populateHTML.displayMovies();
    });


    //Watched Button
    $( document ).on( "click", "#watchedButton", function() {
      var watchedKey = $(this).parent().attr("key");
      var seenIt = new Firebase('https://movie-project.firebaseio.com/movies/' + watchedKey);
      if ( $(this).parent().attr("watched") === "false" ) {
        seenIt.update({'seen-it': true});
      } else {
        seenIt.update({'seen-it': false});
      }
      populateHTML.displayMovies();
    });


    //Watched Tab
    $("#watched").click(function() {
      //console.log(watched);
      $(".movie-info").filter('[watched="true"]').show();
      $(".movie-info").filter('[watched="false"]').hide();
      $("#wish").parent().removeClass('current');
      $('#watched').parent().addClass('current');
      $("#buttonGroups").hide();
      $(".search-results").hide();
      populateHTML.displayMovies();
      $('#titleInput').val("");
    });

    //Star Rating
    $(document).on('click', '.rating span', function() {
      var value = $(this).attr('value');
      var starKey = $(this).parent().parent().attr('key');
      var rating = new Firebase('https://movie-project.firebaseio.com/movies/' + starKey);
      rating.update({'rating': value});
      populateHTML.displayMovies();
    });
    
});
