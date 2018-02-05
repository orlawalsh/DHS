'use strict';

// Declare app level module which depends on views, and components
angular.module('DBHS', [
  'ngRoute',
  'DBHS.main',
  'DBHS.home',
  'DBHS.register',
  'DBHS.welcome',
  'DBHS.addLevel',
  'DBHS.shop'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
 

  $routeProvider.otherwise({redirectTo: '/main'});
}]);
