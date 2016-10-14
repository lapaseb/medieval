angular.module('starter.controllers')
.controller('EtablissementsCtrl', ['$scope', '$http','$rootScope', 'etablissementsService',
    function($scope, $http, $rootScope, etablissementsService) {
       
		etablissementsService.get(function (data) {
			$scope.etablissementsRow = data;
			$scope.etablissements = [];
			for (var i = 0; i < $scope.etablissementsRow.events.length; i++) {
				$scope.etablissements[i] = {
					id: i, 
					name: $scope.etablissementsRow.events[i].name,
					description: $scope.etablissementsRow.events[i].description
				};

			}
		});

    }
]);