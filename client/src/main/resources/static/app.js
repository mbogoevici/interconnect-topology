'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.bootstrap',
    'ngRoute',
    'ngAnimate',
    'myApp.home',
    'myApp.localRegion1',
    'myApp.localRegion2',
    'myApp.globalRegion1',
    'myApp.globalRegion2',
    'myApp.services',
    'myApp.version'
]).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
