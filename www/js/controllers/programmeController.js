angular.module('starter.controllers')
.controller('ProgrammeCtrl', ['$scope', '$http','$rootScope', '$stateParams', 'programmesService', '$state',
    function($scope, $http, $rootScope, $stateParams, programmesService, $state) {

	    $scope.go = function () {
	    	$state.go("app.programme-map", { "id": $stateParams.id});
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
