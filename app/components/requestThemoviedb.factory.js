/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

'use strict';
(function () {
    angular
        .module('app')
        .factory('requestTheMovieDB', requestTheMovieDB);

    /**
     * @param {function} $http - HTTP servers
     * @param {object} $q - Promise
     * @param {object} toaster - non-blocking notification
     * @param {object} configApi - provider from $get
     */
    function requestTheMovieDB($http, $q, toaster, configApi){
        /**
         * @param {string} url
         * @return {object} deferred.promise
         */
        return function(url){
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: configApi.api + url,
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