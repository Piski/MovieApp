angular.module('MovieApp')
    .factory("db", ['$http', function($http) {
        var serviceBase = 'src/dbService/';
        var obj = {};

        obj.getMovie = function(id){
            return $http.get(serviceBase + "movie/" + id);
        };

        obj.getMovies = function(){
            return $http.get(serviceBase + "movies");
        };

        obj.addMovie = function(title, actors, plot, poster){
            for (i = 0; i < 2; i++) poster = encodeURIComponent(poster);
            console.log(poster);
            return $http.post(serviceBase + "add_movie/" + title + "/" + actors + "/" + plot + "/" + poster);
        };

        obj.updateMovie = function(id, title, actors, plot, poster){
            poster = encapsulateUrl(poster);
            return $http.put(serviceBase + "update_movie/" + id + "/" + title + "/" + actors + "/" + plot + "/" + poster);
        };

        obj.deleteMovie = function(id){
            return $http.delete(serviceBase + "delete_movie/" + id);
        };

        return obj;
    }]);