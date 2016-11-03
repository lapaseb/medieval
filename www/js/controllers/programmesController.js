angular.module('starter.controllers')
.controller('ProgrammesCtrl', ['$scope', '$http','$rootScope', 'programmesService',
    function($scope, $http, $rootScope, programmesService) {
		$scope.doRefresh = function() {
			programmesService.get(function (data) {
				$scope.programmesRow = data;
				$scope.programmes = [];
				for (var i = 0; i < $scope.programmesRow.length; i++) {
					$scope.programmes[i] = {
						id: i,
						name: $scope.programmesRow[i].name,
	          			description: $scope.programmesRow[i].description,
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
