MovieApp.controller('AppCtrl', function(omdb, db, $state, $timeout) {

    var self = this;
    self.movies = [];
    self.movie = [];
    self.years = [];
    self.ids = [];

    /*
    *   OMDB API
    */

    self.getMovie = function(title, year) {
        year = typeof year === 'undefined' ? "" : year;
        omdb.getMovie(title, year).then(function(data){
            console.log(data.data);
            self.movie = {
                poster: data.data.Poster,
                title: data.data.Title,
                actors: data.data.Actors,
                plot: data.data.Plot,
                rating: data.data.imdbRating,
                genre: data.data.Genre
            };
        });
    };
    
    /*
    *   DATABASE INTERACTION
    */

    self.addMovie = function(title, actors, plot, poster, rating, genre) {
        db.addMovie(title, actors, plot, poster, rating, genre);
    };

    self.deleteMovie = function(id) {
        db.deleteMovie(self.movies[id].id);
        $timeout(function () {
            self.updateList();
        }, 100);
        
    };

    self.updateList = function()  {
        db.getMovies().success(function(data) { self.movies = data; });
        $timeout(function () {
            $state.go($state.current, { param: true });
        }, 0);
    };
    
    self.editMovie = function(id) {
        db.getMovie(id).success(function(data) { self.movie = data; });
    };
    
    self.updateMovie = function(id, title, actors, plot, poster, rating, genre) {
        db.updateMovie(id, title, actors, plot, poster, rating, genre);
    };

    // occupy select field with years
    for(var i = 2015; i >= 1975; i--) self.years.push(i);

    self.updateList();
});