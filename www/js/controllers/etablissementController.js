angular.module('starter.controllers')
.controller('EtablissementCtrl', ['$scope', '$http','$rootScope', '$stateParams', 'etablissementsService', 'votesService',
    function($scope, $http, $rootScope, $stateParams, etablissementsService, votesService) {

  		var etaid = $stateParams.id;

  		etablissementsService.get(function (data) {
			$scope.etablissement = {
				id: etaid,
				name: data[etaid].name,
				description: data[etaid].description,
				menu: data[etaid].menu,
				type: data[etaid].type
			};

			if(window.Connection && navigator.connection.type != Connection.NONE) {
				if(data[etaid].type == "Restaurant" || data[etaid].type == "Taverne"){
					$('.ratingSystemTitle').show();
					if($scope.rating.noteRep == -1 && $scope.rating.noteAmbiance == -1 && $scope.rating.noteDeco == -1) {
						$('.ratingSystem').show();
					} else {
						$('.editVote').show();
					}
				}
			}
  		});

		if(window.localStorage.getItem('ratingEta') != undefined){
            var ratingArray = JSON.parse(window.localStorage.getItem('ratingEta'));

            for(var i = 0; i < ratingArray.length; i++){
                if(ratingArray[i].eta == $stateParams.id){
                	$scope.rating = ratingArray[i];
                }
            }
        } 
		
		if($scope.rating == undefined) {
        	$scope.rating = {"noteRep" : -1,
			                "noteAmbiance" : -1,
			                "noteDeco" : -1};   
        }
        


        $scope.rateRepas = function(rating) {
			$scope.rating1 = rating;
		};
		$scope.rateAmbiance = function(rating) {
			$scope.rating2 = rating;
		};
		$scope.rateDeco = function(rating) {
			$scope.rating3 = rating;
		};

		$scope.rateEdit = function(){
			$('.ratingSystem').show(300);
			$('.editVote').hide(300);
		}

		$scope.rateFunction = function(rating) {
			if($scope.rating1 >= 1 &&
				$scope.rating1 <= 5 &&
				$scope.rating2 >= 1 &&
				$scope.rating2 <= 5 &&
				$scope.rating3 >= 1 &&
				$scope.rating3 <= 5)
			{
				votesService.post($stateParams.id, $scope.rating1, $scope.rating2, $scope.rating3);
				$('.ratingSystem').hide(300);

				$('.editVote').show(300);
			
			}
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
