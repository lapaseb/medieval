angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope) {
	//Ouvreur de filtres
	$rootScope.openFilter   = function(viewName){openFilter(viewName);};
	//Fermeur de filtres
	$rootScope.closeFilter  = function(viewName){closeFilter(viewName);};
	//Accesseur de filtres
	$rootScope.getFilter    = function(viewName){return getFilter(viewName);};
	//Changeur de filtre
	$rootScope.changeFilter = function(viewName, filter){changeFilter(viewName, filter);};
});