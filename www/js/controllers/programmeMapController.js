angular.module('starter.controllers')
.controller('ProgrammeMapCtrl', ['$scope', '$http','$rootScope', '$stateParams', 'programmesService', '$ionicPopup',
    function($scope, $http, $rootScope, $stateParams, programmesService, $ionicPopup) {


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


	  L.tileLayer('data/img/MapQuest/{z}/{x}/{y}.png', {
		  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	  }).addTo(map);


    var events = L.icon({
      iconUrl: 'data/img/icons/eventIcon.png',
      iconAnchor: [17, 36]
    });

    var progid = $stateParams.programmeId;

		programmesService.get(function (data) {
			$scope.programmesRow = data;
			$scope.programme = [];
			for (var i = 0; i < $scope.programmesRow.length; i++) {
				if(i == progid) {
					$scope.programme = {
						id: i,
						name: $scope.programmesRow[i].name,
            description: $scope.programmesRow[i].description,
						start: $scope.programmesRow[i].start,
						end: $scope.programmesRow[i].end,
            latitude: $scope.programmesRow[i].latitude,
            longitude: $scope.programmesRow[i].longitude
					};
				}
			}

      $scope.latLngProgramme = L.latLng($scope.programme.latitude, $scope.programme.longitude);

      var pageID = $('#page_programme_carte');

      L.marker($scope.latLngProgramme, {icon: events}).addTo(map);
      setMapPopup(pageID, $scope.programme.name, $scope.programme.description);

      map.panTo($scope.latLngProgramme);

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

          map.panTo($scope.latLngProgramme);

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
