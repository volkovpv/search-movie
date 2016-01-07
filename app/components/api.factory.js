/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

(function () {

    'use strict';

    angular
        .module('app')
        .factory('apiFactory', apiFactoryFunc);

    function apiFactoryFunc($http, $location, $q, toaster){

        var api = {
            popularMovies: popularMovies,
            searchMovies: searchMovies
        };

        return api;

        function popularMovies(page){
            var url = 'http://api.themoviedb.org/3/movie/popular?api_key=72b56103e43843412a992a8d64bf96e9&language=ru&page='+page;
            return request(url)
        }

        function searchMovies(query, page){
            var query = encodeURIComponent(query);
            var url = 'http://api.themoviedb.org/3/search/movie?api_key=72b56103e43843412a992a8d64bf96e9&language=ru&query='+query+'&page='+page;
            return request(url)
        }

        function request(url){
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: url,
                data: null,
                headers: {
                    'Accept': 'application/json'
                }
            }).success(function (response, status, headers, config) {
                if (status === 200 || status === 201 || status === 204) {

                    if ( response.Errors && response.Errors.length ) {

                        response.Errors.forEach(function(value) {
                            toaster.error(value.UserMessage);
                        });

                        deferred.reject(response, status, headers, config);
                    } else {

                        if ( !response.BusinessData ) response.BusinessData = response;

                        deferred.resolve(response.BusinessData, status, headers, config);
                    }

                } else {
                    console.log(response);
                    console.log('status:' + status);
                    console.log(config.BASIC_URL + config.API + url);
                    toaster.error('Ошибка соединения');
                    //toaster.error(response.message || '');
                    deferred.reject(response, status, headers, config);
                }
            }).error(function (response, status, headers, config) {
                //TODO: Добавить нотифейшины сюда(опцианально);
                toaster.error('response');
                toaster.error(response.message);
                deferred.reject(response, status, headers, config);
            });
            return deferred.promise;
        }
    }
})();
