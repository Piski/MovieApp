angular.module('MovieApp')
.controller('updateMovieCtrl', function(db, movie) {
    var self = this;
    self.movie = {};
    self.movie = movie.getMovie();
    
    self.updateMovie = function(id, title, actors, plot, poster, rating, genre) {
        db.updateMovie(id, title, actors, plot, poster, rating, genre);
    };
});