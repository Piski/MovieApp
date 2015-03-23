MovieApp.controller('AppCtrl', function(omdb, db, myfilms, $state, $timeout) {

    var self = this;
    self.movies = [];
    self.movie = [];
    self.years = [];
    self.ids = [];
    self.manual_add = false;
    self.icon = "expand_more";

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
                genres: data.data.Genre,
                error: data.data.Error
            };
        });
    };
    
    /*
     * MYFILMS API 
     */
    
    self.searchMovie = function(title) {
        myfilms.getMovie(title).then(function(data){
            console.log(data);
            self.altMovie = {
                title: data.data.Title
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
    
    self.clearMovie = function() {
        self.movie = {}; 
    };
    
    self.expandAdd = function() {
        console.log("lol");
        self.manual_add = ! self.manual_add;
        console.log(self.manual_add);
        self.icon = self.manual_add ? "expand_less" : "expand_more";
    }

    /*
     * OCCUPY SELECT FIELD WITH YEARS
     */
    for(var i = 2015; i >= 1975; i--) self.years.push(i);
    
    /*
     * UPDATE ON START
     */

    self.updateList();
});