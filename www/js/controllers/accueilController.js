angular.module('starter.controllers')
.controller('AccueilCtrl', ['$scope', '$http','$rootScope', 'programmesService',
    function($scope, $http, $rootScope, programmesService) {
       $rootScope.$on("$ionicView.leave", function(scopes, states) {
	        if (states.stateName == "app.accueil") {
	            $('ion-nav-bar .bar.bar-positive').css("background" , "#e3221b").css("border" , "solid #b51b16 1px");
	        }
	    });

       $rootScope.$on("$ionicView.enter", function(scopes, states) {
	        if (states.stateName == "app.accueil") {
	            $('ion-nav-bar .bar.bar-positive').css("background" , "0").css("border" , "0");

	        }
	    });

       programmesService.get(function (data) {
			$scope.programmesRow = data;
			$scope.programmes = [];
			for (var i = 0; i < $scope.programmesRow.length; i++) {
				$scope.programmes[i] = {
					id: i,
					name: $scope.programmesRow[i].name,
          			description: $scope.programmesRow[i].description,
					start: $scope.programmesRow[i].start,
					end: $scope.programmesRow[i].end
				};

			}
		});


    }
]);