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
    myFirebaseRef.on("value", function(snapshot) {
      require(['hbs!../templates/movieList'], function(movieTemplate) {
      //variable to store firbase data
        var movies = snapshot.val();
        var sortedMovies = _.sortBy(movies, 'title');
        //console.log(snapshot.val());
        //populate html
        if ( $('#wish').parent().hasClass('current') ) {
          $('#movies').html(movieTemplate(sortedMovies));
          $(".movie-info").filter('[watched="false"]').show();
          $(".movie-info").filter('[watched="true"]').hide();
          $('.rating').filter('[watched="true"]').show();
          $('.watched-button').filter('[watched="true"]').hide();
          $('.rating').filter('[watched="false"]').hide();
          $('.watched-button').filter('[watched="false"]').show();
          $('.rating').filter('[rating="1"]').addClass('one');
          $('.rating').filter('[rating="2"]').addClass('two');
          $('.rating').filter('[rating="3"]').addClass('three');
          $('.rating').filter('[rating="4"]').addClass('four');
          $('.rating').filter('[rating="5"]').addClass('five');
      } else {
          $('#movies').html(movieTemplate(sortedMovies));
          $(".movie-info").filter('[watched="false"]').hide();
          $(".movie-info").filter('[watched="true"]').show();
          $('.rating').filter('[watched="true"]').show();
          $('.watched-button').filter('[watched="true"]').hide();
          $('.rating').filter('[watched="false"]').hide();
          $('.watched-button').filter('[watched="false"]').show();
          $('.rating').filter('[rating="1"]').addClass('one');
          $('.rating').filter('[rating="2"]').addClass('two');
          $('.rating').filter('[rating="3"]').addClass('three');
          $('.rating').filter('[rating="4"]').addClass('four');
          $('.rating').filter('[rating="5"]').addClass('five');
      }
      });
    });

    // var $modal = $('.modal').modal({
    //   show: false
    // });

    //Find Button
    // $("#find-button").on('click', function(){
    //   findMovies.searchResults();
    //   $modal.modal('show');
    // });


    //Search Button
    $("#search-button").on('click', function(){
      var movieInput = $("#titleInput").val().toLowerCase();
      $(".movie-info").filter('[title*="'+ movieInput + '"]').show();
      $(".movie-info").not('[title*="'+ movieInput + '"]').hide();
      $("#titleInput").val("");
      findMovies.searchResults();
      $('#display-search').html();
      //$modal.modal('show');
    });

    //Delete Button
    $( document ).on( "click", "#deleteButton", function() {
      var titleKey = $(this).parent().parent().attr("key");
      //console.log("titleKey", titleKey);
      var fb = new Firebase('https://movie-project.firebaseio.com/movies/' + titleKey);
      fb.remove();
    });


    //Modal
    // $(".modal-body").on('click', '.add-button', function(){
    //   var addFB = $(this).parent().attr('key');
    //   addMovie.addMovie(addFB);
    // });

    $('#display-search').on('click', '#search-button', function(){
      var addFB = $(this).parent().attr('key');
      addMovie.addMovie(addFB);
    });

    //Wish List
    $("#wish").click(function() {
      $(".movie-info").filter('[watched="false"]').show();
      $(".movie-info").filter('[watched="true"]').hide();
      $("#watched").parent().removeClass('current');
      $('#wish').parent().addClass('current');
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
    });


    //Watched Tab
    $("#watched").click(function() {
      //console.log(watched);
      $(".movie-info").filter('[watched="true"]').show();
      $(".movie-info").filter('[watched="false"]').hide();
      $("#wish").parent().removeClass('current');
      $('#watched').parent().addClass('current');
    });


    //Star Rating
    $(document).on('click', '.rating span', function() {
      var value = $(this).attr('value');
      var starKey = $(this).parent().parent().attr('key');
      var rating = new Firebase('https://movie-project.firebaseio.com/movies/' + starKey);
      rating.update({'rating': value});
    });
    
});
