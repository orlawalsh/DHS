'use strict';

angular.module('DBHS.home', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', '$firebaseAuth', '$location', 'CommonProp', function($scope, $firebaseAuth, $location, CommonProp){

$scope.logoStyle = {
  "max-width" : "300px",
    "height" :  "100p"

}
$scope.mainStyle = {
    "background" : "#60b0f4"


  }
  $scope.labelStyle = {
    "color" : "#cc3300"
    

  }

    $scope.labelStyle2 = {
    "background-color" : "#cc3300",
    "color" : "white"

  }

$scope.float = {
	"float" : "right",
	"padding" : "30px",
	"color" : "#4a0e63",
	"font-size" : "20px"
}
	$scope.myObj = {
    "color" : "white",
    "background-color" : "#cc3300",
    "font-size" : "50px",
    "padding" : "40px",
    "text-align" : "center"
  }

	$scope.username = CommonProp.getUser();

	if($scope.username){
		$location.path('/welcome');
	}

	$scope.signIn = function(){
		var username = $scope.user.email;
		var password = $scope.user.password;
		var auth = $firebaseAuth();

		auth.$signInWithEmailAndPassword(username, password).then(function(user){
			console.log("User Login Successful");
			CommonProp.setUser($scope.user.email);
			$location.path('/welcome');
		}).catch(function(error){
			$scope.errMsg = true;
			$scope.errorMessage = error.message;
		});
	}

}])

.service('CommonProp', ['$location', '$firebaseAuth', function($location, $firebaseAuth){
	var user = "";
	var auth = $firebaseAuth();

	return {
		getUser: function(){
			if(user == ""){
				user = localStorage.getItem("userEmail");
			}
			return user;
		},
		setUser: function(value){
			localStorage.setItem("userEmail", value);
			user = value;
		},
		logoutUser: function(){
			auth.$signOut();
			console.log("Logged Out Successfully");
			user = "";
			localStorage.removeItem('userEmail');
			$location.path('/home');
		}
	};
}]);