'use strict';

angular.module('DBHS.addLevel', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addLevel', {
		templateUrl: 'addLevel/addLevel.html',
		controller: 'AddLevelCtrl'
	});
}])

.controller('AddLevelCtrl', ['$scope', '$firebaseArray', '$firebaseAuth', '$location', 'CommonProp', function($scope, $firebaseArray, $firebaseAuth, $location, CommonProp){

$scope.float = {
	"float" : "right",
	"padding" : "30px",
	"color" : "#4a0e63",
	"font-size" : "20px"
}
	$scope.logoStyle = {
  "max-width" : "300px",
    "height" :  "100p"

}

$scope.mainStyle = {
    "background" : "#60b0f4"


  }
    $scope.labelStyle = {
    "background-color" : "#cc3300",
    "color" : "white"

  }

$scope.myObj = {
    "color" : "white",
    "background-color" : "#cc3300",
    "font-size" : "40px",
    "padding" : "40px",
    "text-align" : "center"
  }
  //var userId = firebase.auth().currentUser;
	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/home');
	}

	//var userId = firebase.auth().currentUser;

	



	var ref = firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('Articles');
	$scope.articles = $firebaseArray(ref);

	$scope.createPost = function(){
		var date = $scope.article.dateText;
		var level = $scope.article.levelText;
		$scope.articles.$add({
			date: date,
			level: level
		}).then(function(ref){
			console.log(ref);
			$scope.success = true;
			window.setTimeout(function() {
				$scope.$apply(function(){
					$scope.success = false;
				});
			}, 2000);
		}, function(error){
			console.log(error);
		});
	};

}]);
