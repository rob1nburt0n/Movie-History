define(["jquery", "hbs"], function($, Handlebars){
  return {
  	displayMovies: function() {
  		var myFirebaseRef = new Firebase("https://movie-project.firebaseio.com/movies");
    //firebase function fires everytime the page load or the data changes
    myFirebaseRef.once("value", function(snapshot) {
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
  	}
    };
  }); 
