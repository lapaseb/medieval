angular.module('starter.controllers')
.controller('ArtisansCtrl', ['$scope', '$http','$rootScope', 'artisansService',
    function($scope, $http, $rootScope, artisansService) {
		artisansService.get(function (data) {
			$scope.artisansRow = data;
			$scope.artisans = [];
			for (var i = 0; i < $scope.artisansRow.artisans.length; i++) {
				$scope.artisans[i] = {
					id: i,
					name: $scope.artisansRow.artisans[i].name,
					description: $scope.artisansRow.artisans[i].description
				};
			}
		});
    }
]);
