  define(["jquery"], function($){
    return {
      seenMovie: function(){
        var selector = $(this).parent().attr("id");
        $.ajax({
         url: "https://movie-history.firebaseio.com/movies/" + selector + ".json",
         method: "PUT",
         data: "selector.Seen = true"
        });
        
      };
    }
  }); 


  