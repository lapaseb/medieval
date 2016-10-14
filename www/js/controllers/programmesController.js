angular.module('starter.controllers')
.controller('ProgrammesCtrl', ['$scope', '$http','$rootScope', 'programmesService',
    function($scope, $http, $rootScope, programmesService) {
       
		programmesService.get(function (data) {
			$scope.programmesRow = data;
			$scope.programmes = [];
			for (var i = 0; i < $scope.programmesRow.events.length; i++) {
				$scope.programmes[i] = {
					id: i, 
					name: $scope.programmesRow.events[i].name,
					start: $scope.programmesRow.events[i].start,
					end: $scope.programmesRow.events[i].end
				};

			}
		});

    }
]);