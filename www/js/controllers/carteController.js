

angular.module('starter.controllers')
.controller('CarteCtrl', ['$scope', '$http','$rootScope', '$ionicPopup', 'etablissementsService', 'artisansService', 'programmesService', '$state', '$translate', '$ionicLoading',
    function($scope, $http, $rootScope, $ionicPopup, etablissementsService, artisansService, programmesService, $state, $translate, $ionicLoading) {

    // -------------------------------------------------------------------------------------------------------------
    //                         Fonctons utiles pour la map
    // -------------------------------------------------------------------------------------------------------------


    function setMapPopupFullMap(pageID, titre, description, url, id, showButton) {
      var popup = pageID.find(".map-popup");

      if (showButton == false){
        $('#linkToSingle').hide();
      }else {
        $('#linkToSingle').show();
      }

      popup.find('h2').text(titre);
      popup.find('#description-popup').text(description);
      openMapPopup(pageID);

      popup.find('#linkToSingle').click(function() {
        $state.go("app." + url, { "id": id});
      })
    }
    // -------------------------------------------------------------------------------------------------------------



    var southWest = L.latLng(47.369743926768784, 7.174824539917747),
    northEast = L.latLng(47.360589810163582, 7.1379860116837257),
    bounds = L.latLngBounds(southWest, northEast);
    
    var map = L.map('mapid', {
        center: [47.364965, 7.154498],
        zoom: 17,
        minZoom: 15,
        maxZoom: 19,
        maxBounds: bounds,
        zoomControl:false,
        tap: false
    });


    // Déclaration des tableaux de markers
    $scope.artisansMarkers = [];
    $scope.programmesMarkers = [];
    $scope.etablissementMarkers = [];

    // On stock l'ID de la pageID
    var pageID = $('#page_carte');

    // On créé des layerGroup pour grouper les marqueurs sur la carte afin de les gérer plus facilement
    $scope.EvenementLayer = L.layerGroup([]);
    $scope.ArtisanLayer = L.layerGroup([]);
    $scope.EtablissementLayer = L.layerGroup([]);
    $scope.AutreLayer = L.layerGroup([]);
    $scope.GeolocationLayer = L.layerGroup([]);

    var userPosition = L.icon({
      iconUrl: 'data/img/icons/BlueDot.png',
      iconAnchor: [12, 15],
      iconSize: [25,25]
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
            title: 'Erreur de localisation',
            template: 'La localisation ne fonctionne pas en dehors de la ville de St-Ursanne.'
          });

          map.panTo([47.364965, 7.154498]);

        }

    };


    // onError Callback receives a PositionError object
    //
    function onError(error) {
      $scope.hide();
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
          $scope.show();
          navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 3000});
        }

        return container;
      },

    });

    map.addControl(new ourCustomControl());

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

    var taverne = L.icon({
      iconUrl: 'data/img/icons/taverne.png',
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

    var doors = L.icon({
      iconUrl: 'data/img/icons/doors.png',
      iconAnchor: [17, 36]
    });

    var medical = L.icon({
      iconUrl: 'data/img/icons/medicIcon.png',
      iconAnchor: [17, 36]
    })

    var informations = L.icon({
      iconUrl: 'data/img/icons/info.png',
      iconAnchor: [17, 36]
    });

    var atm = L.icon({
      iconUrl: 'data/img/icons/atm.png',
      iconAnchor: [17, 36]
    });

    var parkingIcon = L.icon({
      iconUrl: 'data/img/icons/parking.png',
      iconAnchor: [17, 36]
    });

    var wcmixtes = L.icon({
      iconUrl: 'data/img/icons/wcmixte.png',
      iconAnchor: [17, 36]
    });

    var wchomme = L.icon({
      iconUrl: 'data/img/icons/wchomme.png',
      iconAnchor: [17, 36]
    });

    var wchandic = L.icon({
      iconUrl: 'data/img/icons/wchandic.png',
      iconAnchor: [17, 36]
    });

    var market = L.icon({
      iconUrl: 'data/img/icons/market.png',
      iconAnchor: [17, 36]
    });

    var tourisme = L.icon({
      iconUrl: 'data/img/icons/tourisme.png',
      iconAnchor: [17, 36]
    });


    markerEntree1 = new L.marker([47.364435, 7.153132], {icon: doors}).on('click', function(){setMapPopup(pageID, 'Entrée', '', '', false)});
    markerEntree2 = new L.marker([47.364182, 7.154497], {icon: doors}).on('click', function(){setMapPopup(pageID, 'Entrée', '', '', false)});
    markerEntree3 = new L.marker([47.365954, 7.155788], {icon: doors}).on('click', function(){setMapPopup(pageID, 'Entrée', '', '', false)});
    markerMedical = new L.marker([47.364970, 7.155246], {icon: medical}).on('click', function(){setMapPopup(pageID, 'Premiers secours', '', '', false)});
    markerInformations = new L.marker([47.365735, 7.155225], {icon: informations}).on('click', function(){setMapPopup(pageID, 'Informations', '', '', false)});
    markerAtm1 = new L.marker([47.365776, 7.155331], {icon: atm}).on('click', function(){setMapPopup(pageID, 'Bancomats', '', '', false)});
    markerAtm2 = new L.marker([47.365072, 7.155697], {icon: atm}).on('click', function(){setMapPopup(pageID, 'Bancomats', '', '', false)});
    markerParking = new L.marker([47.366482, 7.156818], {icon: parkingIcon}).on('click', function(){setMapPopup(pageID, 'Parking', '', '', false)});
    markerWcMixtes1 = new L.marker([47.364257, 7.153441], {icon: wcmixtes}).on('click', function(){setMapPopup(pageID, 'Toilettes mixtes', '', '', false)});
    markerWcMixtes2 = new L.marker([47.364438, 7.154478], {icon: wcmixtes}).on('click', function(){setMapPopup(pageID, 'Toilettes mixtes', '', '', false)});
    markerWcMixtes3 = new L.marker([47.365241, 7.154742], {icon: wcmixtes}).on('click', function(){setMapPopup(pageID, 'Toilettes mixtes', '', '', false)});
    markerWcHomme = new L.marker([47.365169, 7.154310], {icon: wchomme}).on('click', function(){setMapPopup(pageID, 'Toilettes hommes', '', '', false)});
    markerWcHandic = new L.marker([47.365213, 7.155855], {icon: wchandic}).on('click', function(){setMapPopup(pageID, 'Toilettes handicapés', '', '', false)});
    markerCommerce1 = new L.marker([47.364529, 7.154189], {icon: market}).on('click', function(){setMapPopup(pageID, 'Commerce', '', '', false)});
    markerCommerce2 = new L.marker([47.364904, 7.154206], {icon: market}).on('click', function(){setMapPopup(pageID, 'Commerce', '', '', false)});
    markerCommerce3 = new L.marker([47.364996, 7.154413], {icon: market}).on('click', function(){setMapPopup(pageID, 'Commerce', '', '', false)});
    markerCommerce4 = new L.marker([47.365502, 7.155137], {icon: market}).on('click', function(){setMapPopup(pageID, 'Commerce', '', '', false)});
    markerCommerce5 = new L.marker([47.365543, 7.155350], {icon: market}).on('click', function(){setMapPopup(pageID, 'Commerce', '', '', false)});
    markerCommerce6 = new L.marker([47.365418, 7.155424], {icon: market}).on('click', function(){setMapPopup(pageID, 'Commerce', '', '', false)});
    markerCommerce7 = new L.marker([47.365849, 7.155511], {icon: market}).on('click', function(){setMapPopup(pageID, 'Commerce', '', '', false)});
    markerCommerce8 = new L.marker([47.364216, 7.154004], {icon: market}).on('click', function(){setMapPopup(pageID, 'Commerce', '', '', false)});
    markerTourisme = new L.marker([47.364212, 7.154325], {icon: tourisme}).on('click', function(){setMapPopup(pageID, 'Office du tourisme', '', '', false)});


    $scope.AutreLayer.addLayer(markerEntree1);
    $scope.AutreLayer.addLayer(markerEntree2);
    $scope.AutreLayer.addLayer(markerEntree3);
    $scope.AutreLayer.addLayer(markerMedical);
    $scope.AutreLayer.addLayer(markerAtm1);
    $scope.AutreLayer.addLayer(markerAtm2);
    $scope.AutreLayer.addLayer(markerInformations);
    $scope.AutreLayer.addLayer(markerParking);
    $scope.AutreLayer.addLayer(markerWcMixtes1);
    $scope.AutreLayer.addLayer(markerWcMixtes2);
    $scope.AutreLayer.addLayer(markerWcMixtes3);
    $scope.AutreLayer.addLayer(markerWcHomme);
    $scope.AutreLayer.addLayer(markerWcHandic);
    $scope.AutreLayer.addLayer(markerCommerce1);
    $scope.AutreLayer.addLayer(markerCommerce2);
    $scope.AutreLayer.addLayer(markerCommerce3);
    $scope.AutreLayer.addLayer(markerCommerce4);
    $scope.AutreLayer.addLayer(markerCommerce5);
    $scope.AutreLayer.addLayer(markerCommerce6);
    $scope.AutreLayer.addLayer(markerCommerce7);
    $scope.AutreLayer.addLayer(markerCommerce8);
    $scope.AutreLayer.addLayer(markerTourisme);
    $scope.AutreLayer.addTo(map);

    // Affiche tous les marqueurs des établissements
    etablissementsService.get(function (data) {
			$scope.etablissementsRow = data;
			$scope.etablissements = [];
			for (var index = 0; index < $scope.etablissementsRow.length; index++) {
				$scope.etablissements[index] = {
					id: index,
					name: $scope.etablissementsRow[index]["name_" + window.localStorage.getItem("lang")],
					description: $scope.etablissementsRow[index]["description_" + window.localStorage.getItem("lang")],
         	type: $scope.etablissementsRow[index].type,
          typeString: $scope.etablissementsRow[index].typeString,
          latitude: $scope.etablissementsRow[index].latitude,
          longitude: $scope.etablissementsRow[index].longitude
			  };

        function setMarker(i){

          if ($scope.etablissements[i].type == 4){
            markerEtablissement = new L.marker([$scope.etablissements[i].latitude, $scope.etablissements[i].longitude], {icon: taverne}).on('click', function(){setMapPopupFullMap(pageID, $scope.etablissements[i].name, $scope.etablissements[i].typeString, 'etablissement', i)});

          } else {
            markerEtablissement = new L.marker([$scope.etablissements[i].latitude, $scope.etablissements[i].longitude], {icon: restaurant}).on('click', function(){setMapPopupFullMap(pageID, $scope.etablissements[i].name, $scope.etablissements[i].typeString, 'etablissement', i)});
            //markerEtablissement = new L.marker([$scope.etablissements[i].latitude, $scope.etablissements[i].longitude], {icon: restaurant}).on('click', function(){$state.go("app.etablissement", { url: '/etablissement/' + i})});
          }


          $scope.EtablissementLayer.addLayer(markerEtablissement);
          $scope.etablissementMarkers.push(markerEtablissement);
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
					name: $scope.artisansRow[index]["name_" + window.localStorage.getItem("lang")],
					latitude: $scope.artisansRow[index].latitude,
					longitude: $scope.artisansRow[index].longitude
				};


        function setMarker(i){
          markerArtisan = new L.marker([$scope.artisans[i].latitude, $scope.artisans[i].longitude], {icon: artisans}).on('click', function(){setMapPopupFullMap(pageID, $scope.artisans[i].name, "", 'artisan', i)});
          $scope.ArtisanLayer.addLayer(markerArtisan);
          $scope.artisansMarkers.push(markerArtisan);
        }

        setMarker(index);
			}
		});

    // Affiche tous les marqueurs du programme (événements)
    programmesService.get(function (data) {
			$scope.programmesRow = data;
			$scope.programmes = [];
			for (var index = 0; index < $scope.programmesRow.length; index++) {

        var start = $scope.programmesRow[index].start.split(/[- :]/);
        var date_start = new Date(start[0], start[1]-1, start[2], start[3], start[4], start[5]);

        var end = $scope.programmesRow[index].end.split(/[- :]/);
        var date_end = new Date(end[0], end[1]-1, end[2], end[3], end[4], end[5]);


				$scope.programmes[index] = {
					id: index,
					name: $scope.programmesRow[index]["name_" + window.localStorage.getItem("lang")],
          description: $scope.programmesRow[index]["description_" + window.localStorage.getItem("lang")],
					start: $scope.programmesRow[index].start,
          startText: start[2] + "." + start[1] + "." + start[0] + " " + $translate.instant('PROGRAMME_TEXTE_HEURE') + " " + start[3] + ":" + start[4],
					end: $scope.programmesRow[index].end,
          endText: end[2] + "." + end[1] + "." + end[0]  + " " + $translate.instant('PROGRAMME_TEXTE_HEURE') + " " + end[3] + ":" + end[4],
					latitude: $scope.programmesRow[index].latitude,
					longitude: $scope.programmesRow[index].longitude

				};

        function setMarker(i){
          markerEvenement = new L.marker([$scope.programmes[i].latitude, $scope.programmes[i].longitude], {icon: events});
          $scope.programmesMarkers.push(markerEvenement);
          markerEvenement.on('click', function(){setMapPopupFullMap(pageID, $scope.programmes[i].name, $scope.programmes[i].startText + " - " + $scope.programmes[i].endText, 'programme', i)});
          $scope.EvenementLayer.addLayer(markerEvenement);
        }

        setMarker(index);
      }
		});




    map.on('click', function(){closeMapPopup(pageID)});

    // Variable permettant de tester si les marqueurs sont affichés ou non
    $scope.showArtisan = false;
    $scope.showRestaurant = false;
    $scope.showEvenement = false;
    $scope.showDefault = true;

    // On ajoute tous les layers de marqueurs précédemment créés à la carte



    $('#restaurant-filter').click(function() {
      if($( this ).hasClass("selected")){
        $( this ).removeClass("selected");
        $( this ).find(".img").removeClass("selected");
        $scope.showRestaurant = false;
        map.removeLayer($scope.EtablissementLayer);

      } else {
        $( this ).addClass("selected");
        $( this ).find(".img").addClass("selected");
        $scope.showRestaurant = true;
        map.addLayer($scope.EtablissementLayer);
      }
    });

    $('#events-filter').click(function() {
      if($( this ).hasClass("selected")){
        $( this ).removeClass("selected");
        $( this ).find(".img").removeClass("selected");
        $scope.showEvenement = false;
        map.removeLayer($scope.EvenementLayer);

      } else {
        $( this ).addClass("selected");
        $( this ).find(".img").addClass("selected");
        $scope.showEvenement = true;
        map.addLayer($scope.EvenementLayer);
      }

    });

    $('#artisans-filter').click(function() {
      if($( this ).hasClass("selected")){
        $( this ).removeClass("selected");
        $( this ).find(".img").removeClass("selected");
        $scope.showArtisan = false;
        map.removeLayer($scope.ArtisanLayer);

      } else {
        $( this ).addClass("selected");
        $( this ).find(".img").addClass("selected");
        $scope.showArtisan = true;
        map.addLayer($scope.ArtisanLayer);
      }
    });

    $('#default-filter').click(function() {
      if($( this ).hasClass("selected")){
        $( this ).removeClass("selected");
        $( this ).find(".img").removeClass("selected");
        $scope.showDefault = false;
        map.removeLayer($scope.AutreLayer);

      } else {
        $( this ).addClass("selected");
        $( this ).find(".img").addClass("selected");
        $scope.showDefault = true;
        map.addLayer($scope.AutreLayer);
      }
    });


  }
]);
