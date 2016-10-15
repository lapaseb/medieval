angular.module('starter.controllers')
.controller('ArtisansCtrl', ['$scope', '$http','$rootScope', 'artisansService',
    function($scope, $http, $rootScope, artisansService) {
		artisansService.get(function (data) {
			$scope.artisansRow = data;
			$scope.artisans = [];
			for (var i = 0; i < $scope.artisansRow.length; i++) {
				$scope.artisans[i] = {
					id: i,
					name: $scope.artisansRow[i].name,
					description: $scope.artisansRow[i].description
				};
			}
		});
    }
]);
