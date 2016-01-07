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
        var vm = this,
            page = 1;

        vm.href = "http://image.tmdb.org/t/p/w185/";
        vm.type = "popular";
        vm.dataInput = "";
        vm.textHeaderTwo = "Популярные фильмы!!!";
        vm.loadAdvanced = 20;
        vm.loadMore = true;
        vm.totalLoad = 0;
        vm.total = 0;
        vm.listMovies = [];


        $scope.$watch('vm.dataInput', function(){
            if(vm.dataInput) {
                //alert(vm.dataInput);
                page = 1;
                vm.textHeaderTwo = "Результат поиска";
                vm.type = "search";
                vm.loadMore = true;
                vm.totalLoad = 0;
                vm.total = 0;
                vm.listMovies = [];
                vm.requestMethod(vm.type, vm.dataInput);

            } else {
                page = 1;
                vm.textHeaderTwo = "Популярные фильмы!!!";
                vm.type = "popular";
                vm.loadMore = true;
                vm.totalLoad = 0;
                vm.total = 0;
                vm.listMovies = [];
                vm.requestMethod(vm.type);
            }
        });

        vm.requestMethod = function(type, query){
            if(type === "popular"){
                apiFactory.popularMovies(page).then(
                    function(response){
                        vm.data = response;
                        vm.listMovies = vm.listMovies.concat(vm.data.results);
                        vm.totalLoad += vm.data.results.length;
                        vm.total = vm.data.total_results;
                        page++;
                        if(!(vm.totalLoad<vm.total)){
                            vm.loadMore = false;
                        }

                        var advanced = vm.total - vm.totalLoad;
                        if(advanced<20){
                            vm.loadAdvanced = advanced;
                        } else {
                            vm.loadAdvanced = 20;
                        }
                    },
                    function(response){
                        console.log(response);
                    });
                return;
            }

            apiFactory.searchMovies(query, page).then(
                function(response){
                    vm.data = response;
                    vm.listMovies = vm.listMovies.concat(vm.data.results);
                    vm.totalLoad += vm.data.results.length;
                    vm.total = vm.data.total_results;
                    page++;
                    if(!(vm.totalLoad<vm.total)){
                        vm.loadMore = false;
                    }

                    var advanced = vm.total - vm.totalLoad;
                    if(advanced<20){
                        vm.loadAdvanced = advanced;
                    } else {
                        vm.loadAdvanced = 20;
                    }

                },
                function(response){
                    console.log(response);
                });


        };

        vm.requestMethod();



    }
})();