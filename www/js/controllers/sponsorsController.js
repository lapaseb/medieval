
angular.module('starter.controllers')
.controller('SponsorsCtrl', ['$scope', '$http','$rootScope', 'sponsorsService',
    function($scope, $http, $rootScope, sponsorsService) {
		sponsorsService.get(function (data) {
			$scope.sponsorsRow = data;
			$scope.sponsors = [];
			for (var i = 0; i < $scope.sponsorsRow.length; i++) {
				$scope.sponsors[i] = {
					id: i,
					name: $scope.sponsorsRow[i].name
				};
			}
		});
  }
]);
