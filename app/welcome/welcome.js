'use strict';

angular.module('DBHS.welcome', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/welcome',{
		templateUrl: 'welcome/welcome.html',
		controller: 'WelcomeCtrl'
	});
}])

.controller('WelcomeCtrl', ['$scope', 'CommonProp', '$firebaseArray', '$firebaseAuth','$firebaseObject', '$location', function($scope, CommonProp, $firebaseArray, $firebaseAuth, $firebaseObject, $location){
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
	$scope.myObj = {
    "color" : "white",
    "background-color" : "#cc3300",
    "font-size" : "40px",
    "padding" : "30px",
    "text-align" : "center"
  }
  $scope.mainStyle = {
    "background" : "#60b0f4"
  }

	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/home');
	}

	//var userId = firebase.auth().currentUser;
// 	var userId = firebase.auth().currentUser;

// if (userId) {
//   // User is signed in.
// } else {
//   // No user is signed in.
// }

	//return firebase.database().ref('users/' + userId + '/Articles').once('value');

	var ref = firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('Articles');
	$scope.articles = $firebaseArray(ref);	

	$scope.editPost = function(id){
		var ref = firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('Articles').child(id);
		$scope.editPostData = $firebaseObject(ref);
		console.log($scope.editPostData);
	};

	$scope.updatePost = function(id){
		var ref = firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).child('Articles').child(id);
		ref.update({
			date: $scope.editPostData.date,
			level: $scope.editPostData.level
		}).then(function(ref){
			$scope.$apply(function(){
				$("#editModal").modal('hide');
			});
		}, function(error){
			console.log(error);
		});
	};
	$scope.deleteCnf = function(article){
		$scope.deleteArticle = article;
	};

	$scope.deletePost = function(deleteArticle){
		$scope.articles.$remove(deleteArticle);
		$("#deleteModal").modal('hide');
	};

	$scope.logout = function(){
		CommonProp.logoutUser();
	}
}])