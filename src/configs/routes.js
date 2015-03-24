angular.module("MovieApp")
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/movies");
        $urlRouterProvider.when("/update", "/movies");
        $stateProvider
            .state('movies', {
                url: "/movies",
                templateUrl: "views/movieList.html",
                controller: "movieListCtrl",
                controllerAs: "app"
            })
            .state('add', {
                url: "/addmovie",
                templateUrl: "views/addMovie.html",
                controller: "addMovieCtrl",
                controllerAs: "app"
            })
            .state('update', {
                url: "/update",
                templateUrl: "views/updateMovie.html",
                controller: "updateMovieCtrl",
                controllerAs: "app"
            });
    });