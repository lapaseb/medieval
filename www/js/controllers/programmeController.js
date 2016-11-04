angular.module('starter.controllers')
.controller('ProgrammeCtrl', ['$scope', '$http','$rootScope', '$stateParams', 'programmesService', '$state', '$translate',
    function($scope, $http, $rootScope, $stateParams, programmesService, $state, $translate) {

	    $scope.go = function () {
	    	$state.go("app.programme-map", { "id": $stateParams.id});
	    };

	    var progid = $stateParams.id;

		programmesService.get(function (data) {
			var now = new Date().getTime();

			var start = data[progid].start.split(/[- :]/);
			var date_start = new Date(start[0], start[1]-1, start[2], start[3], start[4], start[5]);

			var end = data[progid].end.split(/[- :]/);
			var date_end = new Date(end[0], end[1]-1, end[2], end[3], end[4], end[5]);

			var etat = "-";
			var color = "black";

			if(now > date_start && now < date_end){
				etat = $translate.instant('PROGRAMME_TEXTE_STATUT1');
				color = "green";
			} else if(now > date_end){
				etat = $translate.instant('PROGRAMME_TEXTE_STATUT2');
				color = "red";
			} else if(now < date_start){
				etat = $translate.instant('PROGRAMME_TEXTE_STATUT3');
				color = "blue";
			}

			$scope.programme = {
				id: progid,
				name: data[progid]["name_" + window.localStorage.getItem("lang")],
				description: data[progid]["description_" + window.localStorage.getItem("lang")],
				start: data[progid].start,
				end: data[progid].end,
				etat: etat,
				color: color
			};
		});

    }
]);
