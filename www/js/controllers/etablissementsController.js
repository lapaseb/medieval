angular.module('starter.controllers')
.controller('EtablissementsCtrl', ['$scope', '$http','$rootScope', 'etablissementsService',
    function($scope, $http, $rootScope, etablissementsService) {

    	$rootScope.$on("$ionicView.enter", function(scopes, states) {
			if (states.stateName == "app.etablissements") {
				$scope.doRefresh();
			}
		});

		$scope.doRefresh = function() {
			etablissementsService.get(function (data) {
				$scope.etablissementsRow = data;
				$scope.etablissements = [];
				for (var i = 0; i < $scope.etablissementsRow.length; i++) {
					$scope.etablissements[i] = {
						id: i,
						name: $scope.etablissementsRow[i]["name_" + window.localStorage.getItem("lang")],
						description: $scope.etablissementsRow[i]["description_" + window.localStorage.getItem("lang")],
	         			type: $scope.etablissementsRow[i].type,
	         			typeString: $scope.etablissementsRow[i].typeString,
					};
				}
				$scope.$broadcast('scroll.refreshComplete');
			});
	  	};

	  	$scope.doRefresh();

    }
]);
