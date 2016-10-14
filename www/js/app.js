// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
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
  });
})

.config(function($stateProvider, $urlRouterProvider) {
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
      url: '/artisan/:artisanId',
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
    url: '/programme/:programmeId',
    views: {
      'menuContent': {
        templateUrl: 'templates/programme.html',
        controller: 'ProgrammeCtrl'
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
    url: '/etablissement/:etablissementId',
    views: {
      'menuContent': {
        templateUrl: 'templates/etablissement.html',
        controller: 'EtablissementCtrl'
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

  // if none of the above states are matched, use this as the fallback
  ;$urlRouterProvider.otherwise('/app/accueil');
});
