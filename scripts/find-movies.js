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
          // for (var i = 0; i < 5; i++) {
          //   movieData.Search.push(data.Search[i]);
          // }
          $('#display-search').html(findTemplate(movieData));
          $("#titleInput").val("");
        });
      });
    }
  };
});