

angular.module('starter.controllers')
.controller('CarteCtrl', ['$scope', '$http','$rootScope', '$ionicPopup', 'etablissementsService', 'artisansService', 'programmesService',
    function($scope, $http, $rootScope, $ionicPopup, etablissementsService, artisansService, programmesService) {

    var southWest = L.latLng(47.369743926768784, 7.174824539917747),
    northEast = L.latLng(47.360589810163582, 7.1379860116837257),
    bounds = L.latLngBounds(southWest, northEast);

    var map = L.map('mapid', {
        center: [47.364965, 7.154498],
        zoom: 18,
        minZoom: 15,
        maxNativeZoom: 20,
        maxBounds: bounds,
        zoomControl:false,
        tap: false
    });


    var pageID = $('#page_carte');

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

    var restaurant = L.icon({
      iconUrl: 'data/img/icons/restaurantIcon.png',
      iconAnchor: [17, 36]
    });

    var artisans = L.icon({
      iconUrl: 'data/img/icons/artisanIcon.png',
      iconAnchor: [17, 36]
    });

    var events = L.icon({
      iconUrl: 'data/img/icons/eventIcon.png',
      iconAnchor: [17, 36]
    });


    // Affiche tous les marqueurs des établissements
    etablissementsService.get(function (data) {
			$scope.etablissementsRow = data;
			$scope.etablissements = [];
			for (var index = 0; index < $scope.etablissementsRow.length; index++) {
				$scope.etablissements[index] = {
					id: index,
					name: $scope.etablissementsRow[index].name,
					description: $scope.etablissementsRow[index].description,
         	type: $scope.etablissementsRow[index].type,
          latitude: $scope.etablissementsRow[index].latitude,
          longitude: $scope.etablissementsRow[index].longitude
			  };

        function setMarker(i){
          L.marker([$scope.etablissements[i].latitude, $scope.etablissements[i].longitude], {icon: restaurant}).addTo(map).on('click', function(){setMapPopup(pageID, $scope.etablissements[i].name, $scope.etablissements[i].type)});
        }
        
        setMarker(index);
			}
		});


    // Affiche tous les marqueurs des artisans
    artisansService.get(function (data) {
			$scope.artisansRow = data;
			$scope.artisans = [];
			for (var index = 0; index < $scope.artisansRow.length; index++) {
				$scope.artisans[index] = {
					id: index,
					name: $scope.artisansRow[index].name,
					latitude: $scope.artisansRow[index].latitude,
					longitude: $scope.artisansRow[index].longitude
				};

       
        function setMarker(i){
          L.marker([$scope.artisans[i].latitude, $scope.artisans[i].longitude], {icon: artisans}).addTo(map).on('click', function(){setMapPopup(pageID, $scope.artisans[i].name, "")});
        }
        
        setMarker(index);
			}
		});

    // Affiche tous les marqueurs du programme (événements)
    programmesService.get(function (data) {
			$scope.programmesRow = data;
			$scope.programmes = [];
			for (var index = 0; index < $scope.programmesRow.length; index++) {
				$scope.programmes[index] = {
					id: index,
					name: $scope.programmesRow[index].name,
          description: $scope.programmesRow[index].description,
					start: $scope.programmesRow[index].start,
					end: $scope.programmesRow[index].end,
					latitude: $scope.programmesRow[index].latitude,
					longitude: $scope.programmesRow[index].longitude

				};
			
        function setMarker(i){
          L.marker([$scope.programmes[i].latitude, $scope.programmes[i].longitude], {icon: events}).addTo(map).on('click', function(){setMapPopup(pageID, $scope.programmes[i].name, $scope.programmes[i].start + " - " + $scope.programmes[i].end)});
        }
        
        setMarker(index);
      }
		});

    map.on('click', function(){closeMapPopup(pageID)});




    $('#restaurant-filter').click(function() {
      if($( this ).hasClass("selected")){
        $( this ).removeClass("selected");
        $( this ).find(".img").removeClass("selected");

      } else {
        $( this ).addClass("selected");
        $( this ).find(".img").addClass("selected");
      }
    });

    $('#events-filter').click(function() {
      if($( this ).hasClass("selected")){
        $( this ).removeClass("selected");
        $( this ).find(".img").removeClass("selected");

      } else {
        $( this ).addClass("selected");
        $( this ).find(".img").addClass("selected");
      }

    });

    $('#artisans-filter').click(function() {
      if($( this ).hasClass("selected")){
        $( this ).removeClass("selected");
        $( this ).find(".img").removeClass("selected");

      } else {
        $( this ).addClass("selected");
        $( this ).find(".img").addClass("selected");
      }
    });

  }
]);
