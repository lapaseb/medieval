angular.module('starter.controllers')
.controller('EtablissementCtrl', ['$scope', '$http','$rootScope', '$stateParams', 'etablissementsService',
    function($scope, $http, $rootScope, $stateParams, etablissementsService) {
		var etaid = $stateParams.etablissementId;

		etablissementsService.get(function (data) {
			$scope.etablissementsRow = data;
			$scope.etablissement = [];
			for (var i = 0; i < $scope.etablissementsRow.events.length; i++) {
				if(i == etaid) {
					$scope.etablissement = {
						id: i, 
						name: $scope.etablissementsRow.events[i].name,
						description: $scope.etablissementsRow.events[i].description
					};
				}
			}
		});

		$scope.toggleVote = function() {
			$("#vote").attr("src","data/img/thumb-up-full.png");
		}
    }
]);