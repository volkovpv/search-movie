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

    function layoutCtrl($scope, apiFactory, $routeParams, $location, $window){

        var routeParams = $routeParams;

        $window.onpopstate = function(){
            if(routeParams.search){
                page = 1;
                vm.textHeaderTwo = "Популярные фильмы!!!";
                vm.type = "popular";
                vm.dataInput = "";
                vm.loadMore = true;
                vm.totalLoad = 0;
                vm.total = 0;
                vm.listMovies = [];
                vm.requestMethod(vm.type);
                $location.search("");
            }
        };

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

        if(routeParams.search){
            vm.dataInput = routeParams.search;
        }


        $scope.$watch('vm.dataInput', function(){
            var search = "";
            if(vm.dataInput) {
                search = vm.dataInput;
                page = 1;
                vm.textHeaderTwo = "Результат поиска";
                vm.type = "search";
                vm.loadMore = true;
                vm.totalLoad = 0;
                vm.total = 0;
                vm.listMovies = [];
                vm.requestMethod(vm.type, search);
                routeParams.search = search;

                $location.search(routeParams);

            } else {
                page = 1;
                vm.textHeaderTwo = "Популярные фильмы!!!";
                vm.type = "popular";
                vm.loadMore = true;
                vm.totalLoad = 0;
                vm.total = 0;
                vm.listMovies = [];
                vm.requestMethod(vm.type);
                $location.search("");

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

            if(type === "search"){
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
            }
        };

        vm.requestMethod();



    }
})();