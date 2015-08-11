  define(["jquery"], function($){
    return {
      seenMovie: function(){
        $.ajax({
         url: "https://movie-history.firebaseio.com/movies/" +$(this).parent().attr("id") + ".json",
         method: "PUT",
         data: JSON.stringify(newMovie)
        });
        
      };
    }
  }); 


  