

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
        maxBounds: bounds,
        zoomControl:false
    });

    // Callback de succès sur la fonction de localisation, si la localisation a fonctionné on affiche la position de l'utilisateur
    var onSuccess = function(position) {


        userLat = position.coords.latitude;
        userLng =  position.coords.longitude;
        userLatLng = L.latLng(userLat, userLng);


        if (userLat < 47.369743926768784 && userLat > 47.360589810163582 && userLng > 7.174824539917747 && userLng < 7.1379860116837257){

          L.marker(userLatLng).addTo(map).bindPopup('Vous êtes ici').openPopup();
          map.panTo(userLatLng);

        } else {

          var alertPopup = $ionicPopup.alert({
            title: 'Erreur de localisation',
            template: 'La localisation ne fonctionne pas en dehors de la ville de St-Ursanne.'
          });

          map.panTo([47.364965, 7.154498]);

        }

    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
      var alertPopup = $ionicPopup.alert({
        title: 'Erreur de localisation',
        template: 'La localisation ne fonctionne pas. Vérifiez que le GPS soit correctement activé puis réessayez.'
      });

    }



    var ourCustomControl = L.Control.extend({

      options: {
        position: 'topright'
      },

      onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

        container.onclick = function(){
          navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }

        return container;
      },

    });

	  L.tileLayer('data/img/MapQuest/{z}/{x}/{y}.png', {
		  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	  }).addTo(map);

    map.addControl(new ourCustomControl());

	  L.marker([47.365714, 7.155803]).addTo(map);
	  L.marker([47.365660, 7.155120]).addTo(map);
	  L.marker([47.365002, 7.155689]).addTo(map);
	  L.marker([47.364907, 7.154937]).addTo(map);
    L.marker([47.364814, 7.154437]).addTo(map);
    L.marker([47.366814, 7.152437]).addTo(map);
    L.marker([47.366514, 7.152237]).addTo(map);
    L.marker([47.366614, 7.152337]).addTo(map);
    L.marker([47.364424, 7.153161]).addTo(map);
    L.marker([47.365969, 7.155872]).addTo(map);


    }
]);
