

angular.module('starter.controllers')
.controller('CarteCtrl', ['$scope', '$http','$rootScope', '$ionicPopup',
    function($scope, $http, $rootScope, $ionicPopup) {

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



    var zoo = L.icon({
        iconUrl: 'data/img/icons/zoo.png',
        iconSize:     [32, 37], // size of the icon
        iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var number1 = L.icon({
        iconUrl: 'data/img/icons/number_1.png',
        iconSize:     [32, 37], // size of the icon
        iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var number2 = L.icon({
        iconUrl: 'data/img/icons/number_2.png',
        iconSize:     [32, 37], // size of the icon
        iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var number3 = L.icon({
        iconUrl: 'data/img/icons/number_3.png',
        iconSize:     [32, 37], // size of the icon
        iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var camping = L.icon({
        iconUrl: 'data/img/icons/campingtents.png',
        iconSize:     [32, 37], // size of the icon
        iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var bank = L.icon({
        iconUrl: 'data/img/icons/bank_icon.png',
        iconSize:     [32, 37], // size of the icon
        iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var toilets = L.icon({
        iconUrl: 'data/img/icons/toilets.png',
        iconSize:     [32, 37], // size of the icon
        iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var firstaid = L.icon({
        iconUrl: 'data/img/icons/firstaid.png',
        iconSize:     [32, 37], // size of the icon
        iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var parking = L.icon({
        iconUrl: 'data/img/icons/Parking.png',
        iconSize:     [32, 37], // size of the icon
        iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var entrance = L.icon({
        iconUrl: 'data/img/icons/entrance.png',
        iconSize:     [32, 37], // size of the icon
        iconAnchor:   [16, 37], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });


	  L.marker([47.365714, 7.155803], {icon: zoo}).addTo(map);
	  L.marker([47.365660, 7.155120], {icon: number1}).addTo(map);
	  L.marker([47.365002, 7.155689], {icon: number2}).addTo(map);
	  L.marker([47.364907, 7.154937], {icon: firstaid}).addTo(map);
    L.marker([47.364814, 7.154437], {icon: camping}).addTo(map);
    L.marker([47.366814, 7.152437], {icon: bank}).addTo(map);
    L.marker([47.366514, 7.152237], {icon: toilets}).addTo(map);
    L.marker([47.366614, 7.152337], {icon: parking}).addTo(map);
    L.marker([47.364424, 7.153161], {icon: entrance}).addTo(map);
    L.marker([47.365969, 7.155872], {icon: entrance}).addTo(map);



    // Callback de succès sur la fonction de localisation, si la localisation a fonctionné on affiche la position de l'utilisateur
    var onSuccess = function(position) {
        var alertPopup = $ionicPopup.alert({
          title: 'Confirmation de localisation',
          template: position.coords.latitude + ' ' + position.coords.longitude
        });
        L.marker([position.coords.latitude, position.coords.longitude]).addTo(map).bindPopup('Vous êtes ici');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    }
]);
