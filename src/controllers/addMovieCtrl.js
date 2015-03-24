angular.module('MovieApp')
.controller('addMovieCtrl', function(db, omdb, $timeout) {

   var self = this;
    self.movie = [];
    self.years = [];
    self.manual_add = false;
    self.icon = "expand_more";
    self.loading = false;
    
    /*
    *   OMDB API
    */

    self.getMovie = function(title, year) {
        self.loading = true;
        year = typeof year === 'undefined' ? "" : year;
        omdb.getMovie(title, year).then(function(data){
            self.movie = {
                poster: data.data.Poster,
                title: data.data.Title,
                actors: data.data.Actors,
                plot: data.data.Plot,
                rating: data.data.imdbRating,
                genres: data.data.Genre,
                error: data.data.Error
            };
        }).finally(function() {
            self.loading = false;
        });
    };
    
    /*
     * DATABASE INTERACTION
     */
    
    self.addMovie = function(title, actors, plot, poster, rating, genre) {
        db.addMovie(title, actors, plot, poster, rating, genre);
    };
    
    /*
     * MISC
     */

    self.expandAdd = function() {
        self.manual_add = ! self.manual_add;
        self.icon = self.manual_add ? "expand_less" : "expand_more";
    }

    /*
     * OCCUPY SELECT FIELD WITH YEARS
     */
    
    for(var i = 2015; i >= 1975; i--) self.years.push(i);
    
});