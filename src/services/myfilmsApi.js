angular.module('MovieApp')
.factory("myfilms", ['$http', function($http) {
    var myfilmsUrl = "http://www.myapifilms.com/imdb?title="
    var myfilmsUrlEnd = "&format=JSONP";
    var obj = {};
    obj.getMovie = function(title){
        return $http.get(myfilmsUrl  + title + myfilmsUrlEnd);
    }
    return obj;
}]);