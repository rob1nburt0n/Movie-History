define(["jquery", "populateHTML", "dom-access"], function($, populateHTML, D){
  var movieSearchData;
  return {
    getMovieData: function(){
      var userInput = $("#userInput").val().replace(/ /g, "+");
      $("#userInput").val('');
      $.ajax({
        url: "http://www.omdbapi.com/?t=" + userInput + "&r=json",
        method: "GET"
      }).done(function(data){
          movieSearchData = data;
          if (movieSearchData.Response === "False") {
          D.moviesToAdd.html("<h3>Sorry.  I Couldn't find that movie in our database.</h3>");
        }else{
          populateHTML.putSearchInHTML({'movies': [data]});          
        }
      });      
    },
    addMovieToFirebase: function(){
      var newMovie = {
        "Title": movieSearchData.Title,
        "Year": movieSearchData.Year,
        "Actors": movieSearchData.Actors,
        "imdbRating": movieSearchData.imdbRating,
        "Poster": movieSearchData.Poster,
        "Seen": false
      };
      $.ajax({
      url: "https://movie-history.firebaseio.com/movies.json",
      method: "POST",
      data: JSON.stringify(newMovie)
      }).done(function(){
        $("#moviesToAdd").prepend('<h1>Movie Successfully Added!</h1>');
        $("#addMovie").remove();
      });
    }   
    };
  }
); 

