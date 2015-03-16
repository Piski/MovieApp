angular.module('MovieApp')
.factory("omdb", ['$http', function($http) {
    var omdbUrl = "http://www.omdbapi.com/?"
    var obj = {};
    obj.getMovie = function(title, year){
        return $http.get(omdbUrl + "t=" + title + "&y=" + year + "&plot=short&r=json");
    }
    return obj;
}]);