/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

'use strict';

(function(){
    angular
        .module('app.layout')
        .config(routerConfig)
        .controller('LayoutCtrl', layoutCtrl);

    function routerConfig($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: 'layout/main.html',
            controller: 'LayoutCtrl',
            controllerAs: 'vm',
            reloadOnSearch: false
        });
    }

    function layoutCtrl($scope, apiFactory){
        var vm = this;
        vm.href = "http://image.tmdb.org/t/p/w185/";

        vm.requestMethod = function(){
            apiFactory.popularMovies().then(
                function(response){
                    vm.data = response;
                    vm.listPopularMovies = vm.data.results;

                    //console.log(response);
                },
                function(response){
                    console.log(response);
                })
        };

        vm.requestMethod();

    }
})();