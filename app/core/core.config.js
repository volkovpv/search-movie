/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

(function () {
    'use strict';
    angular
        .module('app.core')
        .config(routerConfig);

    /* @ngInject */
    function routerConfig($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider.when('/', {
            templateUrl: 'layout/main.html',
            controller: 'LayoutCtrl',
            controllerAs: 'vm',
            reloadOnSearch: false
        });

        $routeProvider.when('/movie', {
            templateUrl: 'movie/movie.html',
            controller: 'MovieCtrl',
            controllerAs: 'vm',
            reloadOnSearch: false
        });

        $routeProvider.otherwise({redirectTo: '/'});
    }
})();
