angular.module('starter.controllers')
.controller('ProgrammesCtrl', ['$scope', '$http','$rootScope', 'programmesService',
    function($scope, $http, $rootScope, programmesService) {

    	$rootScope.$on("$ionicView.enter", function(scopes, states) {
			if (states.stateName == "app.programmes") {
				$scope.doRefresh();
			}
		});

		$scope.doRefresh = function() {
			programmesService.get(function (data) {
				$scope.programmesRow = data;
				$scope.programmes = [];
				for (var i = 0; i < $scope.programmesRow.length; i++) {
					$scope.programmes[i] = {
						id: i,
						name: $scope.programmesRow[i]["name_" + window.localStorage.getItem("lang")],
	          			description: $scope.programmesRow[i]["description_" + window.localStorage.getItem("lang")],
						start: $scope.programmesRow[i].start,
						end: $scope.programmesRow[i].end
					};
				}
				$scope.$broadcast('scroll.refreshComplete');
			});
	  	};

	  	$scope.doRefresh();

    }
]);
