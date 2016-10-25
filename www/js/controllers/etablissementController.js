angular.module('starter.controllers')
.controller('EtablissementCtrl', ['$scope', '$http','$rootScope', '$stateParams', 'etablissementsService',
    function($scope, $http, $rootScope, $stateParams, etablissementsService) {

  		var etaid = $stateParams.etablissementId;

  		etablissementsService.get(function (data) {
  			$scope.etablissementsRow = data;
  			$scope.etablissement = [];
  			for (var i = 0; i < $scope.etablissementsRow.length; i++) {
  				if(i == etaid) {
  					$scope.etablissement = {
  						id: i,
  						name: $scope.etablissementsRow[i].name,
  						description: $scope.etablissementsRow[i].description,
              menu: $scope.etablissementsRow[i].menu
  					};
  				}
  			}
  		});

      $scope.rateFunction = function(rating) {
        // Ajouter rating dans la base de donnée
      };
    }
])

.directive('starRating',
	function() {
		return {
			restrict : 'A',
			template : '<ul class="rating">'
					 + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
					 + '<i class="icon ion-star"></i>'
					 + '</li>'
					 + '</ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&'
			},
			link : function(scope, elem, attrs) {
				var updateStars = function() {
					scope.stars = [];
					for ( var i = 0; i < scope.max; i++) {
						scope.stars.push({
							filled : i < scope.ratingValue
						});
					}
				};

				scope.toggle = function(index) {
					scope.ratingValue = index + 1;
					scope.onRatingSelected({
						rating : index + 1
					});
				};

				scope.$watch('ratingValue',
					function(oldVal, newVal) {
						if (newVal) {
							updateStars();
						}
					}
				);
			}
		}
	}
);
