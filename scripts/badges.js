define(["jquery"], function($){
  return {
    populateBadges: function(data) {
      var seenCount = 0;
      var toSeeCount = 0;
      for(var movie in data.movies){
        if (data.movies[movie].Seen === "true"){
          seenCount += 1;
        } else {
          toSeeCount += 1;
        }
      }
      $("#numMoviesSeen").text(seenCount);
      $("#numMoviesToSee").text(toSeeCount);
    }
  };//end of return
});//end of define