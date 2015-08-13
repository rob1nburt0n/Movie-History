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
      var thisMovie = $(this).parent().attr('id');
      $.ajax({
        url: "https://movie-history.firebaseio.com/movies/" + thisMovie + ".json",
        method: "DELETE"
      });
    },
    changeMovie: function(){
      if($('#newRatingDiv').text().length > 0) {
        $('#newRatingDiv').show();
      }else{
      $(this).parent().append('<div id="newRatingDiv"><label>New Rating: <input id="newRating" type="number" name="newRating" autofocus placeholder="New Rating"></label><button id="newRatingBtn" class="btn btn-primary">Submit</button></div>');
      }
    },
    submitRating: function(){
      var thisMovie = $(this).parent().parent().attr('id');
      var newRating = $('#newRating').val();
      if (newRating < 11 && newRating > 0 && typeof parseInt(newRating) === "number") {
        $("#ratingAlert").remove();
        $.ajax({
          url: "https://movie-history.firebaseio.com/movies/" + thisMovie + "/imdbRating.json",
          method: "PUT",
          data: newRating
        });
      } else {
        $(this).parent().parent().append('<h3 id="ratingAlert" class="alert alert-danger" role="alert">Please enter a value between 1 and 10</h3>');
      }
    }
  };//return
});//end module