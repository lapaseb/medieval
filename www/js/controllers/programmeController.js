angular.module('starter.controllers')
.controller('ProgrammeCtrl', ['$scope', '$http','$rootScope', '$stateParams', 'programmesService', '$location',
    function($scope, $http, $rootScope, $stateParams, programmesService, $location) {

	    $scope.go = function () {
	      $location.path('#/app/programme-map/' + $stateParams.id);
	    };

	    var progid = $stateParams.id;

		programmesService.get(function (data) {
			$scope.programme = {
				id: progid,
				name: data[progid].name,
				description: data[progid].description,
				start: data[progid].start,
				end: data[progid].end
			};
		});

    }
]);
