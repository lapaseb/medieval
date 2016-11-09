angular.module('starter.controllers')
.controller('SponsorCtrl', ['$scope', '$http','$rootScope', 'sponsorsService', '$stateParams',
    function($scope, $http, $rootScope, sponsorsService, $stateParams) {
      var etaid = $stateParams.id;

  		sponsorsService.get(function (data) {
			$scope.sponsor = {
				id: etaid,
				name: data[etaid]["name_" + window.localStorage.getItem("lang")],
				description: data[etaid]["description_" + window.localStorage.getItem("lang")],
				img: data[etaid]["img"]
			};
    })
  }
]);
