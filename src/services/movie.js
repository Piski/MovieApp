angular.module('MovieApp')
.factory("movie", function() {
    var obj = {};
    var movie = {};
    obj.addMovie = function(data) { movie = data; };
    obj.getMovie = function(){ return movie; };
    return obj;
});