'use restrict';

angular.module('DBHS.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  });
}])

.controller('RegisterCtrl', ['$scope', '$firebaseAuth', '$location', function($scope, $firebaseAuth, $location){

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

	$scope.signUp = function(){
		var username = $scope.user.email;
		var password = $scope.user.password;

		if(username && password){
			var auth = $firebaseAuth();
			auth.$createUserWithEmailAndPassword(username, password).then(function(user){
				console.log("User Successfully Created");
        let usersRef = firebase.database().ref("users");
        usersRef.child(user.uid).set({
                   
                  });
				$location.path('/home');
			}).catch(function(error){
				$scope.errMsg = true;
				$scope.errorMessage = error.message;
			});
		}
	}

}])

