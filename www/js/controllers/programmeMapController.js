angular.module('starter.controllers')
.controller('ProgrammeMapCtrl', ['$scope', '$http','$rootScope', '$stateParams', 'programmesService', '$ionicPopup', '$ionicLoading',
    function($scope, $http, $rootScope, $stateParams, programmesService, $ionicPopup, $ionicLoading) {


    var southWest = L.latLng(47.369743926768784, 7.174824539917747),
    northEast = L.latLng(47.360589810163582, 7.1379860116837257),
    bounds = L.latLngBounds(southWest, northEast);

    var map = L.map('mapProgramme', {
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


    var events = L.icon({
      iconUrl: 'data/img/icons/eventIcon.png',
      iconAnchor: [17, 36]
    });

  

    var userPosition = L.icon({
      iconUrl: 'data/img/icons/BlueDot.png',
      iconAnchor: [12, 15],
      iconSize: [25,25]
    });


    $scope.GeolocationLayer = L.layerGroup([]);

    var progid = $stateParams.id;

		programmesService.get(function (data) {
					$scope.programme = {
						id: progid,
						name: data[progid]["name_" + window.localStorage.getItem("lang")],
            description: data[progid]["description_" + window.localStorage.getItem("lang")],
						start: data[progid].start,
						end: data[progid].end,
            latitude: data[progid].latitude,
            longitude: data[progid].longitude
					};

      $scope.latLngProgramme = L.latLng($scope.programme.latitude, $scope.programme.longitude);

      var pageID = $('#page_programme_carte');

      L.marker($scope.latLngProgramme, {icon: events}).addTo(map);
      setMapPopup(pageID, $scope.programme.name, $scope.programme.description);

      map.panTo($scope.latLngProgramme);

		});


    $scope.show = function() {
      $ionicLoading.show({
        template: '</br><ion-spinner></ion-spinner><p></br>Localisation en cours</p>',
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
        userLng =  position.coords.longitude;
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
            title: 'Erreur de localisation',
            template: 'La localisation ne fonctionne pas en dehors de la ville de St-Ursanne.'
          });

          map.panTo($scope.latLngProgramme);

        }

    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
      $scope.hide();
      var alertPopup = $ionicPopup.alert({
        title: 'Erreur de localisation',
        template: 'La localisation ne fonctionne pas. Vérifiez que le GPS soit correctement activé puis redémarrez votre application.'
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
          navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 3000, enableHighAccuracy: true });
        }

        return container;
      },

    });

    map.addControl(new ourCustomControl());

    }
]);
