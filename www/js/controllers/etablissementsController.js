angular.module('starter.controllers')
.controller('EtablissementsCtrl', ['$scope', '$http','$rootScope', 'etablissementsService',
    function($scope, $http, $rootScope, etablissementsService) {

		$scope.doRefresh = function() {
			etablissementsService.get(function (data) {
				$scope.etablissementsRow = data;
				$scope.etablissements = [];
				for (var i = 0; i < $scope.etablissementsRow.length; i++) {
					$scope.etablissements[i] = {
						id: i,
						name: $scope.etablissementsRow[i].name,
						description: $scope.etablissementsRow[i].description,
	         			type: $scope.etablissementsRow[i].type
					};
				}
				$scope.$broadcast('scroll.refreshComplete');
			});
	  	};

	  	$scope.doRefresh();

    }
]);
