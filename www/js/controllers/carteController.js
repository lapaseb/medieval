

angular.module('starter.controllers')
.controller('CarteCtrl', ['$scope', '$http','$rootScope',
    function($scope, $http, $rootScope) {

    var southWest = L.latLng(47.369743926768784, 7.174824539917747),
    northEast = L.latLng(47.360589810163582, 7.1379860116837257),
    bounds = L.latLngBounds(southWest, northEast);

    var map = L.map('mapid', {
        center: [47.364965, 7.154498],
        zoom: 18,
        minZoom: 15,
        maxNativeZoom: 20,
        maxBounds: bounds
    });

	  L.tileLayer('data/img/MapQuest/{z}/{x}/{y}.png', {
		  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	  }).addTo(map);


	  // Cordier
	  L.marker([47.365714, 7.155803]).addTo(map).bindPopup("Cordier");

	  // Minéraux
	  L.marker([47.365660, 7.155120]).addTo(map).bindPopup("Minéraux");

	  // Tailleur d'ardoises
	  L.marker([47.365002, 7.155689]).addTo(map).bindPopup("Tailleur d'ardoises");

	  // Epices
	  L.marker([47.364907, 7.154937]).addTo(map).bindPopup("Epices");

    }
]);
