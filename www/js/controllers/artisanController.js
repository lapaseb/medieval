angular.module('starter.controllers')
.controller('ArtisanCtrl', ['$scope', '$http','$rootScope', '$stateParams', 'artisansService', '$ionicPopup',
    function($scope, $http, $rootScope, $stateParams, artisansService, $ionicPopup) {



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


	  L.tileLayer('data/img/MapQuest/{z}/{x}/{y}.png', {
		  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	  }).addTo(map);


		var etaid = $stateParams.artisanId;

		artisansService.get(function (data) {
			$scope.artisansRow = data;
			$scope.artisan = [];
			for (var i = 0; i < $scope.artisansRow.length; i++) {
				if(i == etaid) {
					$scope.artisan = {
						id: i,
						name: $scope.artisansRow[i].name,
						description: $scope.artisansRow[i].description,
            latitude: $scope.artisansRow[i].latitude,
            longitude: $scope.artisansRow[i].longitude
					};

				}
			}

      $scope.latLngArtisan = L.latLng($scope.artisan.latitude, $scope.artisan.longitude);

      L.marker($scope.latLngArtisan).addTo(map).bindPopup('<h3>'+$scope.artisan.name+'</h3>' +  '<p class="artisanDescription">' + $scope.artisan.description + '</p>').openPopup();
      map.panTo($scope.latLngArtisan);

		});


    // Callback de succès sur la fonction de localisation, si la localisation a fonctionné on affiche la position de l'utilisateur
    var onSuccess = function(position) {

        if (position.coords.latitude > 47.369743926768784 || position.coords.longitude < 47.360589810163582 || position.coords.longitude > 7.174824539917747 || position.coords.longitude < 7.1379860116837257){
          var alertPopup = $ionicPopup.alert({
            title: 'Erreur de localisation',
            template: 'La localisation ne fonctionne pas en dehors de la ville de St-Ursanne.'
          });
        } else {
          L.marker([position.coords.latitude, position.coords.longitude]).addTo(map).bindPopup('Vous êtes ici');
        }

    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
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


    map.addControl(new ourCustomControl());



    }
]);
