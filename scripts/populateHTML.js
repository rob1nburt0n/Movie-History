define(["jquery","hbs", "dom-access"], function($, Handlebars, D){
  return {
    putSeenMoviesInHTML: function(data) {
      
        require(['hbs!../templates/movies'],function(movieTemplate){
          D.moviesDiv.html(movieTemplate(data));
        });
      },
      putSearchInHTML: function(data) {
        require(['hbs!../templates/addMovie'],function(movieTemplate){
          D.moviesDiv.html(movieTemplate(data));
        });
      }      
    };
  }
); 
