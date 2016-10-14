angular.module('starter.controllers')
.controller('ProgrammeCtrl', ['$scope', '$http','$rootScope', '$stateParams', 'programmesService', '$location',
    function($scope, $http, $rootScope, $stateParams, programmesService, $location) {

    $scope.go = function () {
      $location.path('#/app/programme-map/' + $stateParams.programmeId);
    };

    var progid = $stateParams.programmeId;

		programmesService.get(function (data) {
			$scope.programmesRow = data;
			$scope.programme = [];
			for (var i = 0; i < $scope.programmesRow.length; i++) {
				if(i == progid) {
					$scope.programme = {
						id: i,
						name: $scope.programmesRow[i].name,
            description: $scope.programmesRow[i].description,
						start: $scope.programmesRow[i].start,
						end: $scope.programmesRow[i].end
					};
				}
			}
		});
    }
]);
