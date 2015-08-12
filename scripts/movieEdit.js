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
    },
    changeMovie: function(){
      if($('#newRatingDiv').text().length > 0) {
        $('#newRatingDiv').show();
      }else{
      $(this).parent().append('<div id="newRatingDiv"><label>New Rating: <input id="newRating" type="number" name="newRating" autofocus placeholder="New Rating"></label><button id="newRatingBtn">Submit</button></div>');
      }
    },
    submitRating: function(){
      var thisMovie = $(this).parent().parent().attr('id');
      var newRating = $('#newRating').val();
      $.ajax({
        url: "https://movie-history.firebaseio.com/movies/" + thisMovie + "/imdbRating.json",
        method: "PUT",
        data: newRating
      });
    }
  };//return
});//end module