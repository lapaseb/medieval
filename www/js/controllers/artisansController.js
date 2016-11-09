angular.module('starter.controllers')
.controller('ArtisansCtrl', ['$scope', '$http','$rootScope', 'artisansService',
    function($scope, $http, $rootScope, artisansService) {

    	$rootScope.$on("$ionicView.enter", function(scopes, states) {
			if (states.stateName == "app.artisans") {
				$scope.doRefresh();
			}
		});

    	$scope.doRefresh = function() {
    		artisansService.get(function (data) {
				$scope.artisansRow = data;
				$scope.artisans = [];
				for (var i = 0; i < $scope.artisansRow.length; i++) {
					$scope.artisans[i] = {
						id: i,
						name: $scope.artisansRow[i]["name_" + window.localStorage.getItem("lang")],
						description: $scope.artisansRow[i]["description_" + window.localStorage.getItem("lang")],
						img: $scope.artisansRow[i]["img"]
					};					
				}
				$scope.$broadcast('scroll.refreshComplete');
			});
	  	};

	  	$scope.doRefresh();
    }
]);
