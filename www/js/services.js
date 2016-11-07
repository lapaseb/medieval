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

    .factory('votesService', ['$http', '$rootScope', '$ionicPopup', function($http, $rootScope, $ionicPopup){
        return {
            post:function(etablissement, noteRepas, noteAmbiance, noteDeco) {



                var ratingArray = [];
                voteUpdate = false;

                //if id deja présent
                if(window.localStorage.getItem('ratingEta') != undefined){
                     //modifier BD
                    var ratingArray = JSON.parse(window.localStorage.getItem('ratingEta'));

                    for(var i = 0; i < ratingArray.length; i++){
                        if(ratingArray[i].eta == etablissement){

                            ratingArray[i]["noteRep"] = noteRepas;
                            ratingArray[i]["noteAmbiance"] = noteAmbiance;
                            ratingArray[i]["noteDeco"] = noteDeco;

                            window.localStorage.setItem('ratingEta', JSON.stringify(ratingArray));

                            $http.post($rootScope.apiUrl + '/editRates', {
                                "id" : ratingArray[i].id,
                                "apiKey" : "ZF2k9r4h",
                                "etablissement" : etablissement,
                                "noteRepas" : noteRepas,
                                "noteAmbiance" : noteAmbiance,
                                "noteDeco" : noteDeco,
                            }).success(function(data) {
                                
                            }).error(function(){
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Erreur de votation',
                                    template: 'La votation a échoué, verifiez votre connexion internet puis réessayez.'
                                });
                            });

                            voteUpdate = true;
                        }
                    }
                } 

                if(voteUpdate == false){
                    $http.post($rootScope.apiUrl + '/setRates', {
                        "apiKey" : "ZF2k9r4h",
                        "etablissement" : etablissement,
                        "noteRepas" : noteRepas,
                        "noteAmbiance" : noteAmbiance,
                        "noteDeco" : noteDeco,
                    }).success(function(data) {
                        ratingArray.push({
                            "id" : data,
                            "eta" : etablissement,
                            "noteRep" : noteRepas,
                            "noteAmbiance" : noteAmbiance,
                            "noteDeco" : noteDeco
                        });

                        window.localStorage.setItem('ratingEta', JSON.stringify(ratingArray));
                    }).error(function(){
                        var alertPopup = $ionicPopup.alert({
                            title: 'Erreur de votation',
                            template: 'La votation a échoué, verifiez votre connexion internet puis réessayez.'
                        });
                    });;
                }



            }
      }
    }])
