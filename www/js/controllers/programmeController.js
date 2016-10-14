angular.module('starter.controllers')
.controller('ProgrammeCtrl', ['$scope', '$http','$rootScope', '$stateParams', 'programmesService',
    function($scope, $http, $rootScope, $stateParams, programmesService) {

    	var progid = $stateParams.programmeId;

		programmesService.get(function (data) {
			$scope.programmesRow = data;
			$scope.programme = [];
			for (var i = 0; i < $scope.programmesRow.events.length; i++) {
				if(i == progid) {
					$scope.programme = {
						id: i,
						name: $scope.programmesRow.events[i].name,
            description: $scope.programmesRow.events[i].description,
						start: $scope.programmesRow.events[i].start,
						end: $scope.programmesRow.events[i].end
					};
				}
			}
		});
    }
]);
