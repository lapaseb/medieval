angular.module('starter.controllers')
.controller('ToutweekendCtrl', ['$scope', '$http','$rootScope', '$state',
    function($scope, $http, $rootScope, $state) {

      $rootScope.goToArtisans = function(){
        $state.go("app.artisans");
      }
    }
]);
