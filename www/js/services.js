angular.module('starter.services', [])
    .factory('programmesService', ['$http', '$rootScope', function($http, $rootScope){
        return {
            get:function(callback) {

                if(window.Connection && navigator.connection.type != Connection.NONE) {
                    //si il a de la co
                    $http.get($rootScope.apiUrl + '/getEvents').success(function(data) {
                        window.localStorage.setItem('programmes-json', JSON.stringify(data));
                        callback(data);
                    });
                } else {
                    //si il a pas de co
                    if(window.localStorage.getItem('programmes-json')){
                        callback(JSON.parse(window.localStorage.getItem('programmes-json')));
                    } else {
                        $http.get('data/JSON/events.json').success(function(data) {
                            callback(data);
                        });
                    }
                }
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

    .factory('sponsorsService', ['$http',function($http){
        return {
            get:function(callback) {
                $http.get('data/JSON/sponsors.json').success(function(data) {
                    callback(data);
                });
            }
      }
    }])
