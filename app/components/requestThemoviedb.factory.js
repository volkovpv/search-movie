/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

'use strict';
(function () {
    angular
        .module('app')
        .factory('requestTheMovieDB', requestTheMovieDB);

    function requestTheMovieDB($http, $location, $q, toaster, configApi){
        return function(url){
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: configApi + url,
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
                toaster.error('response');
                toaster.error(response.message);
                deferred.reject(response, status, headers, config);
            });
            return deferred.promise;
        }
    }
})();