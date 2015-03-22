angular.module("MovieApp")
    .config(function($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/movies");
        //
        // Now set up the states
        $stateProvider
            .state('movies', {
                url: "/movies",
                templateUrl: "views/movieList.html"
                /*
                controller: "listCtrl",
                controllerAs: "app"
                */
            })
            .state('add', {
                url: "/addmovie",
                templateUrl: "views/addMovie.html"
                /*
                controller: "addCtrl",
                controllerAs: "app"
                */
            })
            .state('update', {
                url: "/update",
                templateUrl: "views/updateMovie.html"
                /*
                    controller: "listCtrl",
                    controllerAs: "app"
                    */
            });
    });