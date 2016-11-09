angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope) {
	//Ouvreur de filtres
	$rootScope.openFilter   = function(viewName){console.log('controller.js open');openFilter(viewName);};
	//Fermeur de filtres
	$rootScope.closeFilter  = function(viewName){console.log('controller.js close');closeFilter(viewName);};
	//Accesseur de filtres
	$rootScope.getFilter    = function(viewName){console.log('controller.js get');return getFilter(viewName);};
	//Changeur de filtre
	$rootScope.changeFilter = function(viewName, filter){console.log('controller.js change');changeFilter(viewName, filter);};
});