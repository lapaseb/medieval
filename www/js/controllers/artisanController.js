angular.module('starter.controllers')
.controller('ArtisanCtrl', ['$scope', '$http','$rootScope', '$stateParams', 'artisansService',
    function($scope, $http, $rootScope, $stateParams, artisansService) {
		var etaid = $stateParams.artisanId;

		artisansService.get(function (data) {
			$scope.artisansRow = data;
			$scope.artisan = [];
			for (var i = 0; i < $scope.artisansRow.artisans.length; i++) {
				if(i == etaid) {
					$scope.artisan = {
						id: i,
						name: $scope.artisansRow.artisans[i].name,
						description: $scope.artisansRow.artisans[i].description
					};
				}
			}
		});

    }
]);
