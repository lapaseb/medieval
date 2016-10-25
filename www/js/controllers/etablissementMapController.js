angular.module('starter.controllers')
.controller('EtablissementMapCtrl', ['$scope', '$http','$rootScope', '$stateParams', 'etablissementsService', '$ionicPopup',
    function($scope, $http, $rootScope, $stateParams, etablissementsService, $ionicPopup) {


    var southWest = L.latLng(47.369743926768784, 7.174824539917747),
    northEast = L.latLng(47.360589810163582, 7.1379860116837257),
    bounds = L.latLngBounds(southWest, northEast);

    var map = L.map('mapEtablissement', {
        center: [47.364965, 7.154498],
        zoom: 18,
        minZoom: 15,
        maxNativeZoom: 20,
        maxBounds: bounds,
        zoomControl:false
    });


    var tileLayer = L.tileLayer(
      'data/img/MapQuest/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 15,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    var restaurant = L.icon({
      iconUrl: 'data/img/icons/restaurantIcon.png',
      iconAnchor: [17, 36]
    });

    var progid = $stateParams.id;

		etablissementsService.get(function (data) {
			
					$scope.etablissement = {
						id: progid,
						name: data[progid].name,
            description: data[progid].description,
            latitude: data[progid].latitude,
            longitude: data[progid].longitude
					};


      $scope.latLngEtablissement = L.latLng($scope.etablissement.latitude, $scope.etablissement.longitude);
      var pageID = $('#page_etablissement_carte');

      L.marker($scope.latLngEtablissement, {icon: restaurant}).addTo(map);
      setMapPopup(pageID, $scope.etablissement.name, $scope.etablissement.description);
      map.panTo($scope.latLngEtablissement);

		});

    // Callback de succès sur la fonction de localisation, si la localisation a fonctionné on affiche la position de l'utilisateur
    var onSuccess = function(position) {


        userLat = position.coords.latitude;
        userLng =  position.coords.longitude;
        userLatLng = L.latLng(userLat, userLng);


        if (userLat < 47.369743926768784 && userLat > 47.360589810163582 && userLng < 7.174824539917747 && userLng > 7.1379860116837257){

          L.marker(userLatLng).addTo(map).bindPopup('Vous êtes ici').openPopup();
          map.panTo(userLatLng);

        } else {

          var alertPopup = $ionicPopup.alert({
            title: 'Erreur de localisation',
            template: 'La localisation ne fonctionne pas en dehors de la ville de St-Ursanne.'
          });

          map.panTo($scope.latLngEtablissement);

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
          navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 3000});
        }

        return container;
      },

    });

    map.addControl(new ourCustomControl());

    }
]);
