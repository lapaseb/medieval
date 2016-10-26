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

    .factory('votesService', ['$http', '$rootScope', function($http, $rootScope){
        return {
            post:function(etablissement, noteRepas, noteAmbiance, noteDeco) {

                var ratingArray = [];
                var sendSql = true;

                if(window.localStorage.getItem('ratingEta') != undefined){
                    var ratingArray = JSON.parse(window.localStorage.getItem('ratingEta'));

                    for(var i = 0; i < ratingArray.length; i++){
                        if(ratingArray[i].eta == etablissement){
                            ratingArray.splice(i, 1);
                            sendSql = false;
                        }
                    }
                }

                ratingArray.push({
                    "eta" : etablissement,
                    "noteRep" : noteRepas,
                    "noteAmbiance" : noteAmbiance,
                    "noteDeco" : noteDeco
                });

                window.localStorage.setItem('ratingEta', JSON.stringify(ratingArray));

                if(sendSql){
                    $http.post($rootScope.apiUrl + '/setRates', {
                        "etablissement" : etablissement,
                        "noteRepas" : noteRepas,
                        "noteAmbiance" : noteAmbiance,
                        "noteDeco" : noteDeco,
                    });
                }

            }
      }
    }])
