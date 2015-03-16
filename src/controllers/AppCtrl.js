MovieApp.controller('AppCtrl', function(omdb, db, $state, $timeout) {

    var self = this;
    self.movies = [];
    self.movie = [];
    self.years = [];
    self.ids = [];

    // update list


    self.getMovie = function(title, year) {
        year = typeof year === 'undefined' ? "" : year;
        omdb.getMovie(title, year).then(function(data){
            self.movie = {
                poster: data.data.Poster,
                title: data.data.Title,
                actors: data.data.Actors,
                plot: data.data.Plot
            };
        });
    };

    self.addMovie = function(title, actors, plot, poster) {
        db.addMovie(title, actors, plot, poster);
    };

    self.deleteMovie = function(id) {
        db.deleteMovie(self.movies[id].id);
        self.updateList();
    };

    self.updateList = function()  {
        db.getMovies().success(function(data) { self.movies = data; });
        $timeout(function () {
            $state.go("movies", {}, { reload: true });
        }, 100);
    };

    // occupy select field with years
    for(var i = 2015; i >= 1975; i--) self.years.push(i);

    self.updateList();
});

/*
MovieApp.controller('listCtrl', function(omdb, db, $state) {

});

MovieApp.controller('addCtrl', function(omdb, db, $state) {
    for(var i = 2015; i >= 1975; i--) {
        self.years.push(i)
    }
})
*/