

angular.module('starter.controllers')
.controller('ProgrammesCtrl', ['$scope', '$http','$rootScope',
    function($scope, $http, $rootScope) {
       
    	$scope.programmes = [
		    { title: '1', id: 1 },
		    { title: '2', id: 2 },
		    { title: '3', id: 3 },
		    { title: '4', id: 4 },
		    { title: '5', id: 5 },
		    { title: '6', id: 6 }
		  ];
       
    }
]);