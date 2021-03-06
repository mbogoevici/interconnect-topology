'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.bootstrap',
  'ngRoute',
  'ngAnimate',
  'myApp.home',
  'myApp.region1',
  'myApp.region2',
  'myApp.services',
  'myApp.version'
]).

config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
