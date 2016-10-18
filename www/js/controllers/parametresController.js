angular.module('starter.controllers')
.controller('ParametresCtrl', ['$scope', '$http','$rootScope', '$translate',
    function($scope, $http, $rootScope, $translate) {
       
		$scope.currentLang = window.localStorage.getItem("lang");;
		$scope.changeLang = function(lang){
			window.localStorage.setItem("lang", lang);
			$translate.use(lang);
		}
       
    }
]);