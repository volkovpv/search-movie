/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

(function(){
    'use strict';
    angular
        .module('app.layout')
        .controller('LayoutCtrl', layoutCtrl);

    /**
     * @param {object} $scope
     * @param {object} $routeParams
     * @param {object} $location - window.location
     * @param {object} $window - window object
     * @param {object} movies - service
     * @param {object} configApi - provider
     */
    function layoutCtrl($scope, $routeParams, $location, $window, movies, configApi){
        var vm          = this,
            routeParams = $routeParams,
            page        = 1;

        vm.href             = configApi.img;
        vm.loadAdvanced     = 20;
        vm.startPage        = start;
        vm.requestMethod    = request;
        vm.textHeaderTwo    = "Популярные фильмы.";
        vm.type             = "popular";
        vm.dataInput        = "";
        vm.loadMore         = true;
        vm.totalLoad        = 0;
        vm.total            = 0;
        vm.listMovies       = [];
        vm.data             = "";


        $window.onpopstate = actionHistory;

        if(routeParams.search){
            vm.dataInput = routeParams.search;
        }

        $scope.$watch('vm.dataInput', search);

        /**
         * if routeParams.search is empty, then show the popular movies
         */
        function actionHistory(){
            if(!routeParams.search){
                vm.startPage();
            }
        }

        function search(){
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
                vm.startPage();
            }
        }

        /**
         * @param {string} type - type page
         * @param {string} query - search query
         */
        function request(type, query){
            if(type === "popular"){
                movies.popularMovies(page).then(
                    function(response){
                        var advanced = 0;

                        vm.data = response;
                        vm.listMovies = vm.listMovies.concat(vm.data.results);
                        vm.totalLoad += vm.data.results.length;
                        vm.total = vm.data.total_results;
                        page++;
                        if(!(vm.totalLoad<vm.total)){
                            vm.loadMore = false;
                        }

                        advanced = vm.total - vm.totalLoad;
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
                movies.searchMovies(query, page).then(
                    function(response){
                        var advanced = 0;

                        vm.data = response;
                        vm.listMovies = vm.listMovies.concat(vm.data.results);
                        vm.totalLoad += vm.data.results.length;
                        vm.total = vm.data.total_results;
                        page++;
                        if(!(vm.totalLoad<vm.total)){
                            vm.loadMore = false;
                        }

                        advanced = vm.total - vm.totalLoad;
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
        }

        function start(){
            page = 1;
            vm.textHeaderTwo = "Популярные фильмы.";
            vm.type = "popular";
            vm.dataInput = "";
            vm.loadMore = true;
            vm.totalLoad = 0;
            vm.total = 0;
            vm.listMovies = [];
            vm.requestMethod(vm.type);
            $location.search("");
        }
    }
})();