var MovieApp = angular.module('MovieApp', ['ngMaterial', 'ui.router'])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('deep-purple')
            .accentPalette('pink');
    });