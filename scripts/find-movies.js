define(["jquery"], function($){
  return {
    searchResults: function() {
      require(['hbs!../templates/find'], function(findTemplate) {
        var input = $('#titleInput').val();
        console.log(input);
        $.ajax({
          url: "http://www.omdbapi.com/?s=" + input
        }).done(function(data) {
          console.log(data);
          $('.modal-body').html(findTemplate(data));
        });
      });
    }
  }
});