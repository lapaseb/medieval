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

			var weekday = new Array(7);
			weekday[0]=  "Dimanche";
			weekday[1] = "Lundi";
			weekday[2] = "Mardi";
			weekday[3] = "Mercredi";
			weekday[4] = "Jeudi";
			weekday[5] = "Vendredi";
			weekday[6] = "Samedi";

			var months = new Array(12);
			months[0]=  "Janvier";
			months[1] = "Février";
			months[2] = "Mars";
			months[3] = "Avril";
			months[4] = "Mai";
			months[5] = "Juin";
			months[6] = "Juillet";
			months[7] = "Août";
			months[8] = "Septembre";
			months[9] = "Octobre";
			months[10] = "Novembre";
			months[11] = "Décembre";

			$scope.programme = {
				id: progid,
				name: data[progid]["name_" + window.localStorage.getItem("lang")],
				description: data[progid]["description_" + window.localStorage.getItem("lang")],
				start: data[progid].start,
				startText: $translate.instant('PROGRAMME_WEEKDAY_' + date_start.getDay()) + " " + start[2] + " " + $translate.instant('PROGRAMME_MONTH_' + start[1]) + " " + start[0] + " " + $translate.instant('PROGRAMME_TEXTE_HEURE') + " " + start[3] + ":" + start[4],
				end: data[progid].end,
				endText: $translate.instant('PROGRAMME_WEEKDAY_' + date_end.getDay()) + " " + end[2] + " " + $translate.instant('PROGRAMME_MONTH_' + start[1]) + " " + end[0] + " " + $translate.instant('PROGRAMME_TEXTE_HEURE') + " " + end[3] + ":" + end[4],
				etat: etat,
				color: color
			};
		});
    }
]);
