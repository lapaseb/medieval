angular.module('starter.controllers')
.controller('ArtisanMapCtrl', ['$scope', '$http','$rootScope', '$stateParams', 'artisansService', '$ionicPopup', '$ionicLoading',
    function($scope, $http, $rootScope, $stateParams, artisansService, $ionicPopup, $ionicLoading) {



    var southWest = L.latLng(47.369743926768784, 7.174824539917747),
    northEast = L.latLng(47.360589810163582, 7.1379860116837257),
    bounds = L.latLngBounds(southWest, northEast);

    var map = L.map('mapArtisan', {
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

    var artisans = L.icon({
      iconUrl: 'data/img/icons/artisanIcon.png',
      iconAnchor: [17, 36]
    });

    var userPosition = L.icon({
      iconUrl: 'data/img/icons/BlueDot.png',
      iconAnchor: [12, 15],
      iconSize: [25,25]
    });


    $scope.GeolocationLayer = L.layerGroup([]);


		var etaid = $stateParams.id;


		artisansService.get(function (data) {
			$scope.artisan = {
				id: etaid,
				name: data[etaid]["name_" + window.localStorage.getItem("lang")],
        latitude: data[etaid].latitude,
        longitude: data[etaid].longitude
			};

      $scope.latLngArtisan = L.latLng($scope.artisan.latitude, $scope.artisan.longitude);
      var pageID = $('#page_artisanMap');


      L.marker($scope.latLngArtisan, {icon: artisans}).addTo(map);
      setMapPopup(pageID, $scope.artisan.name, "");
      map.panTo($scope.latLngArtisan);

		});

    $scope.show = function() {
      $ionicLoading.show({
        template: '</br><ion-spinner></ion-spinner><p></br>' + $translate.instant('POPUP_LOADER_LOCALISATION') + '</p>',
      }).then(function(){
         
      });
    };
    $scope.hide = function(){
      $ionicLoading.hide().then(function(){
         
      });
    };

    // Callback de succès sur la fonction de localisation, si la localisation a fonctionné on affiche la position de l'utilisateur
    var onSuccess = function(position) {
        $scope.hide();
        userLat = position.coords.latitude;
        userLng = position.coords.longitude;
        userLatLng = L.latLng(userLat, userLng);

        if (userLat < 47.369743926768784 && userLat > 47.360589810163582 && userLng < 7.174824539917747 && userLng > 7.1379860116837257){

          if ($scope.GeolocationLayer.getLayers().length > 0){
            map.removeLayer($scope.GeolocationLayer.getLayers()[0]);
            $scope.GeolocationLayer = L.layerGroup([]);
            markerPosition = new L.marker(userLatLng, {icon: userPosition});
            $scope.GeolocationLayer.addLayer(markerPosition);
            map.addLayer($scope.GeolocationLayer);
            map.panTo(userLatLng);
          } else {
            markerPosition = new L.marker(userLatLng, {icon: userPosition});
            $scope.GeolocationLayer.addLayer(markerPosition);
            map.addLayer($scope.GeolocationLayer);
            map.panTo(userLatLng);
          }

        } else {

          var alertPopup = $ionicPopup.alert({
            title: $translate.instant('POPUP_ERROR_LOCALISATION_TITLE'),
            template: $translate.instant('POPUP_ERROR_LOCATION_CONTENT')
          });

          map.panTo([47.364965, 7.154498]);

        }

    };


    // onError Callback receives a PositionError object
    //
    function onError(error) {
      $scope.hide();
      var alertPopup = $ionicPopup.alert({
        title: $translate.instant('POPUP_ERROR_LOCALISATION_TITLE'),
        template: $translate.instant('POPUP_ERROR_LOCALISATION_CONTENT')
      });

    }


    var ourCustomControl = L.Control.extend({

      options: {
        position: 'topright'
      },

      onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

        container.onclick = function(){
          $scope.show();
          navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 3000});
        }

        return container;
      },

    });


    map.addControl(new ourCustomControl());



    }
]);
