angular.module('starter.controllers')
.controller('ProgrammesCtrl', ['$scope', '$http','$rootScope', 'programmesService', '$translate',
    function($scope, $http, $rootScope, programmesService, $translate) {

    	$rootScope.$on("$ionicView.enter", function(scopes, states) {
			if (states.stateName == "app.programmes") {
				$scope.doRefresh();
			}
		});

		$scope.doRefresh = function() {
			programmesService.get(function (data) {
				$scope.programmesRow = data;
				$scope.programmes = [];

				var now = new Date().getTime();

				for (var i = 0; i < $scope.programmesRow.length; i++) {

					var start = $scope.programmesRow[i].start.split(/[- :]/);
					var date_start = new Date(start[0], start[1]-1, start[2], start[3], start[4], start[5]);

					var end = $scope.programmesRow[i].end.split(/[- :]/);
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

					$scope.programmes[i] = {
						id: i,
						name: $scope.programmesRow[i]["name_" + window.localStorage.getItem("lang")],
	          			description: $scope.programmesRow[i]["description_" + window.localStorage.getItem("lang")],
						start: $scope.programmesRow[i].start,
						startText: start[2] + "." + start[1] + "." + start[0] + " " + $translate.instant('PROGRAMME_TEXTE_HEURE') + " " + start[3] + ":" + start[4],
						end: $scope.programmesRow[i].end,
						endText: end[2] + "." + end[1] + "." + end[0]  + " " + $translate.instant('PROGRAMME_TEXTE_HEURE') + " " + end[3] + ":" + end[4],
						etat: etat,
						color: color
					};
				}
				$scope.$broadcast('scroll.refreshComplete');
			});
	  	};

	  	$scope.doRefresh();

    }
]);
