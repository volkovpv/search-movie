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


        $routeProvider.when('/view2', {
            templateUrl: '/view2/view2.html'
        });

        $routeProvider.otherwise({redirectTo: '/'});
    }
})();
