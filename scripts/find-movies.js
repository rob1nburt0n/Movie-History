define(["jquery"], function($){
  return {
    searchResults: function() {
      require(['hbs!../templates/find'], function(findTemplate) {
        var input = $('#titleInput').val();
        //console.log(input);
        $.ajax({
          url: "http://www.omdbapi.com/?s=" + input
        }).done(function(data) {
          var movieData = {
            Search: []
          };
          for (var i = 0; i < 5; i++) {
            var matchedMovies = $('.movie-info').filter('[title="'+data.Search[i].Title.toLowerCase()+'"]');
            console.log(matchedMovies);
            if (matchedMovies.length === 0) {
              movieData.Search.push(data.Search[i]);
            }
          }
          $('#movies').append(findTemplate(movieData));
          //$("#titleInput").val("");
        });
      });
    }
  };
});