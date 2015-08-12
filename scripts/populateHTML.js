define(["jquery","hbs", "dom-access"], function($, Handlebars, D){
  return {
    putSeenMoviesInHTML: function(data) {
        require(['hbs!../templates/moviesSeen'],function(movieTemplate){
          D.moviesSeenDiv.html(movieTemplate(data));
        });
      },
      putToSeeMoviesInHTML: function(data) {
        require(['hbs!../templates/moviesToSee'],function(movieTemplate){
          D.moviesToSee.html(movieTemplate(data));
        });
      },
      putSearchInHTML: function(data) {
        require(['hbs!../templates/addMovie'],function(movieTemplate){
          D.moviesToAdd.html(movieTemplate(data));
        });
      }      
    };
  }
); 
