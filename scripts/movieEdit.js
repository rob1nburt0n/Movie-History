  define(["jquery"], function($){
    return {
      seenMovie: function(){
        $.ajax({
         url: "https://movie-history.firebaseio.com/movies.json",
         method: "POST",
         data: JSON.stringify(newMovie)
        });
        
      };
    }
  }); 


  