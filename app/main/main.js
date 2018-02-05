'use strict';

angular.module('DBHS.main', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['$scope', '$firebaseAuth', '$location', 'CommonProp', function($scope, $firebaseAuth, $location, CommonProp){

	$scope.myObj = {
    "color" : "white",
    "background-color" : "#cc3300",
    "font-size" : "50px",
    "padding" : "50px",
    "text-align" : "center"
  }

  	$scope.mainStyle = {
    "background" : "#60b0f4"

  }

  	$scope.pStyle = {
    "color" : "#4a0e63"
   
  }

$scope.logoStyle = {
  "max-width" : "300px",
    "height" :  "100p"

}

$scope.float = {
	"float" : "right",
	"padding" : "30px",
	"color" : "#4a0e63",
	"font-size" : "20px"
}

}]);