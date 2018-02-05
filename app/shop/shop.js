'use strict';

angular.module('DBHS.shop', ['ngRoute', 'firebase', 'ngCookies'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/shop', {
		templateUrl: 'shop/shop.html',
		controller: 'StoreController'
	});
}])

.controller('StoreController', ['$scope','$cookies', '$location', function($scope,$cookies, $location){

$scope.logoStyle = {
  "max-width" : "300px",
    "height" :  "100p"

}
$scope.mainStyle = {
    "background" : "#60b0f4"
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

 $scope.column = {
    "-webkit-column-count": "2", /* Chrome, Safari, Opera */
    "-moz-column-count": "2", /* Firefox */
    "column-count": "2"

}

 var count = 0;
        var count1 = 0;
        var details = document.getElementsByClassName('details');
        $scope.product = productsData;
        $scope.sort = '-price';
        $scope.change = function() {
            count++;
            if (count % 2 !== 0) {
                $scope.sort = 'price';
            } else {
                $scope.sort = '-price';
            }
        }

        $scope.changeView = function() {
            count1++;
            if (count1 % 2 !== 0) {
                for (var i = 0; i < details.length; i++) {
                    details[i].style.width = 45 + '%';
                    details[i].style.display = 'inline-block';
                }

            } else {
                for (var i = 0; i < details.length; i++) {
                    details[i].style.width = 45 + '%';
                    details[i].style.display = 'block';
                }
            }
        }

		$scope.products = productsData;
		$scope.cart = [];
	    $scope.total = 0;
	  /*
		if ($cookieStore.get('cart') !== null) {
		 		$scope.cart =  $cookieStore.get('cart');
		}
		*/
		
		if(!angular.isUndefined($cookies.get('total'))){
		  $scope.total = parseFloat($cookies.get('total'));
		}
		
		if (!angular.isUndefined($cookies.get('cart'))) {
		 		$scope.cart =  $cookies.getObject('cart');
		}
		
		$scope.addItemToCart = function(product){
		  
		 	if ($scope.cart.length === 0){
		 		product.count = 1;
		 		$scope.cart.push(product);
		 	} else {
		 		var repeat = false;
		 		for(var i = 0; i< $scope.cart.length; i++){
		 			if($scope.cart[i].id === product.id){
		 				repeat = true;
		 				$scope.cart[i].count +=1;
		 			}
		 		}
		 		if (!repeat) {
		 			product.count = 1;
		 		 	$scope.cart.push(product);	
		 		}
		 	}
		 	var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
		 	$cookies.putObject('cart', $scope.cart,  {'expires': expireDate});
		 	$scope.cart = $cookies.getObject('cart');
		 
		  $scope.total += parseFloat(product.price);
      $cookies.put('total', $scope.total,  {'expires': expireDate});
		 };

		 $scope.removeItemCart = function(product){
		   
		   if(product.count > 1){
		     product.count -= 1;
		     var expireDate = new Date();
         expireDate.setDate(expireDate.getDate() + 1);
		     $cookies.putObject('cart', $scope.cart, {'expires': expireDate});
 			   $scope.cart = $cookies.getObject('cart');
		   }
		   else if(product.count === 1){
		     var index = $scope.cart.indexOf(product);
 			 $scope.cart.splice(index, 1);
 			 expireDate = new Date();
       expireDate.setDate(expireDate.getDate() + 1);
 			 $cookies.putObject('cart', $scope.cart, {'expires': expireDate});
 			 $scope.cart = $cookies.getObject('cart');
		     
		   }
		   
		   $scope.total -= parseFloat(product.price);
       $cookies.put('total', $scope.total,  {'expires': expireDate});
		   
		 };

		 function paypalCheckout ($http, $q, $timeout) {
    return {
      templateUrl: 'shop.html',
      restrict: 'EA',
      scope: {},
      link: function(scope, ele, attrs) {
        var environment = 'sandbox'       // CHANGE AS NEEDED
        var merchantId  = 'orlawelsh-facilitator@gmail.com' // YOUR MERCHANT ID HERE (or import with scope)
        var req = {
          method: 'POST',
          url: 'http://localhost:8000/#/shop',          // YOUR SERVER HERE (or import with scope)
          data: { foo: 'bar' }            // YOUR DATA HERE (or import with scope)
        }
        scope.showButton = false
  
        function sendRequest(data) {
          var deferred = $q.defer()
          $http(data)
            .success(function(data, status) {
              return deferred.resolve(data)
            }).error(function(data, status) {
              if (status === 0) { data = 'Connection error' }
              return deferred.reject(data)
            })
          return deferred.promise
        }
  
        function showButton() {
          scope.showButton = true
          scope.$apply()
        }
  
        function delayAndShowButton() {
          $timeout(showButton, 1000)
        }

		 function loadPaypalButton() {
          paypal.checkout.setup(merchantId, {
            environment: environment,
            buttons: [{ container: 't1', shape: 'rect', size: 'medium' }]
          })
          delayAndShowButton()
        }

		 $scope.initPaypal = function() {
          if ($scope.showButton == false) { return }
          paypal.checkout.initXO()
          return sendRequest(req)
            .then(function(res) {
              return paypal.checkout.startFlow(res.href)
            })
            .catch(function(err) {
              console.log('Problem with checkout flow', err)
              return paypal.checkout.closeFlow()
            })
        }
  
        if (window.paypalCheckoutReady != null) {
          $scope.showButton = true
        } else {
          var s = document.createElement('script')
          s.src = '//www.paypalobjects.com/api/checkout.js'
          document.body.appendChild(s)
          window.paypalCheckoutReady = function() {
            return loadPaypalButton()
          }
        }

	}}}}]);


   
	var productsData = [{
		id: 1,
		name: 'Information Pack',
		des: 'This pack contains all the information you need if you are newly diagnoised or for taking care of a loved one',
		price: 5.99,
		image: 'img/pro1.png'
	},{
		id: 2,
		name: 'Foot Care Kit',
		des: 'This care pack contains all the items you need to look after your feet',
		price: 24.99,
		image: 'img/care.png'
	},{
		id: 3,
		name: 'Teen Insulin Pump Starter Kit',
		des: 'This pack contains everything a for a young teen learning to manage diabetes by themselves',
		price: 59.95,
		image: 'img/pump.jpeg'
	},{
		id: 4,
		name: 'American Girl Kit',
		des: 'This pack contains a doll plus diabetic equipment for the doll - this is a learning tool for kids with diabetes',
		price: 14.99,
		image: 'img/doll.jpg'
	}]