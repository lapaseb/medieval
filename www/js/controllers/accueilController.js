angular.module('starter.controllers')
.controller('AccueilCtrl', ['$scope', '$http','$rootScope',
	function($scope, $http, $rootScope) {

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

			var jours = Math.floor(total_secondes / (60 * 60 * 24));
			var heures = Math.floor((total_secondes - (jours * 60 * 60 * 24)) / (60 * 60));
			var minutes = Math.floor((total_secondes - ((jours * 60 * 60 * 24 + heures * 60 * 60))) / 60);
			var secondes = Math.floor(total_secondes - ((jours * 60 * 60 * 24 + heures * 60 * 60 + minutes * 60)));

			$(".accueil_jours").text(String(jours));
			$(".accueil_heures").text(String(heures));
			$(".accueil_minutes").text(String(minutes));
			$(".accueil_secondes").text(String(secondes));
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

	}
	]);
