// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'pascalprecht.translate'])

.run(function($ionicPlatform, $rootScope, programmesService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    if(ionic.Platform.device().platform == undefined){
       $rootScope.apiUrl = "/api";
    } else {
       $rootScope.apiUrl = "http://medievales.visitapp.ch/API";
    }

    /*
    cordova.plugins.notification.local.schedule({
          id: i,
          title: "Evenement dans 1 heure",
          text: data[i].name,
          at: data[i].start,
          icon: "res://icon.png"
        });
        */

    if(window.localStorage.getItem("areSetNotif") == undefined){
      window.localStorage.setItem("areSetNotif", false);
    }
     
    if (window.cordova && window.localStorage.getItem("areSetNotif") == "false"){
      cordova.plugins.notification.local.cancelAll(function() {}, this);

      programmesService.get(function (data) {
        var events = [];
        for (var i = 0; i < data.length; i++) {
          
           // Split timestamp into [ Y, M, D, h, m, s ]
          var t = data[i].start.split(/[- :]/);
          // Apply each element to the Date function
          var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);

          var now = new Date().getTime();
          if(d > now){
            events.push({
              id: i,
              title: "Événement dans 30 minutes",
              text: data[i].name,
              at: d - (30*60*1000),
              icon: "res://icon.png"
            },
            {
              id: i + data.length,
              title: "L'événement commence maintenant",
              text: data[i].name,
              at: d,
              icon: "res://icon.png"
            });
          }
        }
        cordova.plugins.notification.local.schedule(events);
        window.localStorage.setItem("areSetNotif", true);
      });
    }
    
  });
})

.config(function($stateProvider, $urlRouterProvider, $translateProvider) {
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.accueil', {
    url: '/accueil',
    views: {
      'menuContent': {
        templateUrl: 'templates/accueil.html',
        controller: 'AccueilCtrl'
      }
    }
  })
  .state('app.artisans', {
    url: '/artisans',
    views: {
      'menuContent': {
        templateUrl: 'templates/artisans.html',
        controller: 'ArtisansCtrl'
      }
    }
  })
  .state('app.artisan', {
      url: '/artisan/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/artisan.html',
        controller: 'ArtisanCtrl'
      }
    }
  })
  .state('app.carte', {
      url: '/carte',
      views: {
        'menuContent': {
          templateUrl: 'templates/carte.html',
          controller: 'CarteCtrl'
        }
      }
    })
    .state('app.programmes', {
      url: '/programmes',
      views: {
        'menuContent': {
          templateUrl: 'templates/programmes.html',
          controller: 'ProgrammesCtrl'
        }
      }
    })

  .state('app.programme', {
    url: '/programme/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/programme.html',
        controller: 'ProgrammeCtrl'
      }
    }
  })

  .state('app.programme-map', {
    url: '/programme-map/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/programme-map.html',
        controller: 'ProgrammeMapCtrl'
      }
    }
  })

  .state('app.etablissements', {
    url: '/etablissements',
    views: {
      'menuContent': {
        templateUrl: 'templates/etablissements.html',
        controller: 'EtablissementsCtrl'
      }
    }
  })

  .state('app.etablissement', {
    url: '/etablissement/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/etablissement.html',
        controller: 'EtablissementCtrl'
      }
    }
  })

  .state('app.etablissement-map', {
    url: '/etablissement-map/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/etablissement-map.html',
        controller: 'EtablissementMapCtrl'
      }
    }
  })

  .state('app.securite', {
    url: '/securite',
    views: {
      'menuContent': {
        templateUrl: 'templates/securite.html',
        controller: 'SecuriteCtrl'
      }
    }
  })
  .state('app.concoursCostumes', {
    url: '/concoursCostumes',
    views: {
      'menuContent': {
        templateUrl: 'templates/concours-costumes.html',
        controller: 'ConcoursCostumesCtrl'
      }
    }
  })
  .state('app.contacts', {
    url: '/contacts',
    views: {
      'menuContent': {
        templateUrl: 'templates/contacts.html',
        controller: 'ContactsCtrl'
      }
    }
  })
  .state('app.sponsors', {
    url: '/sponsors',
    views: {
      'menuContent': {
        templateUrl: 'templates/sponsors.html',
        controller: 'SponsorsCtrl'
      }
    }
  })
  .state('app.parametres', {
    url: '/parametres',
    views: {
      'menuContent': {
        templateUrl: 'templates/parametres.html',
        controller: 'ParametresCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  ;$urlRouterProvider.otherwise('/app/accueil');


  /* Traduction */

  $translateProvider.useStaticFilesLoader({
    prefix: 'data/JSON/lang/',
    suffix: '.json'
  });

  if(window.localStorage.getItem("lang") != undefined){
    $translateProvider.preferredLanguage(window.localStorage.getItem("lang"));
  } else {
    $translateProvider.preferredLanguage("fr");
  }

});
