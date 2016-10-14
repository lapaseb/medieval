angular.module('starter.services', [])

    .factory('programmesService', ['$http',function($http){
        return {
          /*
            load:function(callback, lang){
                if(lang == "fr"){
                    $http.get('data/monumentsFR.json').success(callback);
                } else if( lang == "de"){
                    $http.get('data/monumentsDE.json').success(callback);
                }
            }
            ,
            get:function(lieuId, callback, lang) {
                if(lang == "fr"){
                    $http.get('data/monumentsFR.json').success(function(data) {
                        var lieu = data.lieux[lieuId];
                        callback(lieu);
                    });
                } else if( lang == "de"){
                    $http.get('data/monumentsDE.json').success(function(data) {
                        var lieu = data.lieux[lieuId];
                        callback(lieu);
                    });
                }
            }
            */

            get:function(callback) {
                $http.get('data/JSON/events.json').success(function(data) {
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
