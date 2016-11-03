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
				name: data[progid]["name_" + window.localStorage.getItem("lang")],
				description: data[progid]["description_" + window.localStorage.getItem("lang")],
				start: data[progid].start,
				end: data[progid].end
			};
		});

    }
]);
