angular.module('MovieApp', ['ngMaterial', 'ui.router', 'ngMdIcons'])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('deep-purple')
            .accentPalette('pink');
    });