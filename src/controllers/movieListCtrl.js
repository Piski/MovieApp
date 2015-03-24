angular.module('MovieApp')
.controller('movieListCtrl', function(db, $state, $timeout, movie) {
    var self = this;
    self.updateList = function()  {
        db.getMovies().success(function(data) { self.movies = data; });
        $timeout(function () {
            $state.go($state.current, { param: true });
        }, 200);
    };
    
    self.deleteMovie = function(id) {
        db.deleteMovie(self.movies[id].id);
        $timeout(function () {
            self.updateList();
        }, 300);

    };
    
    self.editMovie = function(id) {
        db.getMovie(id).success(function(data) {
            movie.addMovie(data);
            $timeout(function () {
                $state.go("update", { param: true });
            }, 200);
        });
    }; 
    
    /*
     * UPDATE ON START
     */

    self.updateList();
});