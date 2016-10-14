angular.module('starter.services', [])

    .factory('programmesService', ['$http', '$rootScope', function($http, $rootScope){
        return {
            get:function(callback) {
                if(window.Connection) {
                    console.log($rootScope.apiUrl);
                    if(navigator.connection.type == Connection.NONE) {
                        var url = 'data/JSON/events.json';
                    } else {
                        var url = $rootScope.apiUrl + '/getEvents';
                    }
                } else {
                    var url = 'data/JSON/getEvents.json';
                }

                $http.get(url).success(function(data) {
                    callback(data);
                });
               
            }
      }
    }])

    .factory('etablissementsService', ['$http',function($http){
        return {
            get:function(callback) {
                $http.get('data/JSON/etablissements.json').success(function(data) {
                    callback(data);
                });
            }
        }
    }])

    .factory('artisansService', ['$http',function($http){
        return {
            get:function(callback) {
                $http.get('data/JSON/artisans.json').success(function(data) {
                    callback(data);
                });
            }
      }
    }])
