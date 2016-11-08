angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope) {
	//Ouvreur de filtres
	$rootScope.openFilter = function(arg){openFilter(arg);};
	//Fermeur de filtres
	$rootScope.closeFilter = function(){closeFilter();};
	//Accesseur de filtres
	$rootScope.getFilter = function(arg){return getFilter(arg);};
	//Changeur de filtre
	$rootScope.changeFilter = function(arg, param){changeFilter(arg, param);};
});