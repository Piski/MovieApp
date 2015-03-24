angular.module('MovieApp')
.controller('toolbarCtrl', function(db, $timeout, $state) {
    var self = this;
    self.updateList = function()  {
        db.getMovies().success(function(data) { self.movies = data; });
        $timeout(function () {
            $state.go($state.current, { param: true });
        }, 0);
    };
    self.clearMovie = function() {
        self.movie = {}; 
    };
});