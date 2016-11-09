
angular.module('starter.controllers')
.controller('SponsorsCtrl', ['$scope', '$http','$rootScope', 'sponsorsService',
    function($scope, $http, $rootScope, sponsorsService) {

    	$rootScope.$on("$ionicView.enter", function(scopes, states) {
			if (states.stateName == "app.sponsors") {
				$scope.doRefresh();
			}
		});

    	$scope.doRefresh = function() {
    		sponsorsService.get(function (data) {
				$scope.sponsorsRow = data;
				$scope.sponsors = [];
				for (var i = 0; i < $scope.sponsorsRow.length; i++) {
					$scope.sponsors[i] = {
						id: i,
						name: $scope.sponsorsRow[i]["name_" + window.localStorage.getItem("lang")],
						description:  $scope.sponsorsRow[i]["description_" + window.localStorage.getItem("lang")],
						img:  $scope.sponsorsRow[i]["img"]
					};
				}
				$scope.$broadcast('scroll.refreshComplete');
			});
	  	};

	  	$scope.doRefresh();
  }
]);
