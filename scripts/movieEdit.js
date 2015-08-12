  define(["jquery"], function($){
    return {
      seenMovie: function(){
        $.ajax({
         url: "https://movie-history.firebaseio.com/movies/" + $(this).parent().attr("id") + "/Seen.json",
         method: "PUT",
         data: JSON.stringify("true")
        }); 
      },
      deleteMovie: function(){
        console.log('delete clicked');
        var thisMovie = $(this).parent().attr('id');
        $.ajax({
        url: "https://movie-history.firebaseio.com/movies/" + thisMovie + ".json",
        method: "DELETE"
        });
      }
    };
  }); 
