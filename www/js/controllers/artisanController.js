angular.module('starter.controllers')
.controller('ArtisanCtrl', ['$scope', '$http','$rootScope', '$stateParams', 'artisansService',
    function($scope, $http, $rootScope, $stateParams, artisansService) {

  		var etaid = $stateParams.id;

  		artisansService.get(function (data) {
  			$scope.artisan = {
  				id: etaid,
          description: data[etaid]["description_" + window.localStorage.getItem("lang")],
  				name: data[etaid]["name_" + window.localStorage.getItem("lang")],
          latitude: data[etaid].latitude,
          longitude: data[etaid].longitude,
          img: data[etaid].img,
  			};

  		});

    }
]);
