define(["jquery"], function($){
  return {
    searchResults: function() {
      require(['hbs!../templates/find'], function(findTemplate) {
        var input = $('#titleInput').val();
        $.ajax({
          url: "http://www.omdbapi.com/?s=" + input
        }).done(function(data) {
          $('.modal-body').html(findTemplate(data));
        });
      });
    }
  }
});