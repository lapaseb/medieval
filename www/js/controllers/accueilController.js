angular.module('starter.controllers')
.controller('AccueilCtrl', ['$scope', '$http','$rootScope', 'programmesService', '$translate',
	function($scope, $http, $rootScope, programmesService, $translate) {

		$rootScope.$on("$ionicView.leave", function(scopes, states) {
			if (states.stateName == "app.accueil") {
				$('ion-nav-bar .bar.bar-positive').css("background" , "#e3221b").css("border" , "solid #b51b16 1px");
				window.screen.unlockOrientation();
			}
		});

		$rootScope.$on("$ionicView.enter", function(scopes, states) {
			if (states.stateName == "app.accueil") {
				$('ion-nav-bar .bar.bar-positive').css("background" , "0").css("border" , "0");
				window.screen.lockOrientation('portrait');				
			}
		});

		function compteARebours(){
			var date_actuelle = new Date();
			var date_evenement = new Date("Jul 07 18:00:00 2017");

			var total_secondes = (date_evenement - date_actuelle) / 1000;

			if(total_secondes > 0){
				var jours = Math.floor(total_secondes / (60 * 60 * 24));
				var heures = Math.floor((total_secondes - (jours * 60 * 60 * 24)) / (60 * 60));
				var minutes = Math.floor((total_secondes - ((jours * 60 * 60 * 24 + heures * 60 * 60))) / 60);
				var secondes = Math.floor(total_secondes - ((jours * 60 * 60 * 24 + heures * 60 * 60 + minutes * 60)));

				$(".accueil_jours").text(String(jours));
				$(".accueil_heures").text(String(heures));
				$(".accueil_minutes").text(String(minutes));
				$(".accueil_secondes").text(String(secondes));
			} else {
				$(".accueil_timer").css("display","none");
				$("#quickmenu").css("position","initial");
				$(".accueil_event_list").css("display","block");
				$(".accueil_event_list ion-content").css("top", $("#quickmenu").offset().top + $("#quickmenu").outerHeight(true) + $(".accueil_event_list h1").outerHeight(true));
			}
		}

		compteARebours();

		var t=setInterval(function(){
			compteARebours();
		},1000);

		$scope.rotation = 0;

		$('ion-header-bar .ion-navicon').on('click', function() {
			if($scope.rotation == 900) {
				$scope.rotation = 0;
			} else {
				$scope.rotation = 900;
			}
			$(this).css(
				{'-ms-transform':'rotate('+$scope.rotation+'deg)',
				'-webkit-transform':'rotate('+$scope.rotation+'deg)',
				'transform':'rotate('+$scope.rotation+'deg)',
				'transition':'transform 300ms'}
    		);
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
						end: $scope.programmesRow[i].end,
						etat: etat,
						color: color,
						img: $scope.programmesRow[i].img
					};
				}

			});
	  	};

	  	$scope.doRefresh();

	}
]);