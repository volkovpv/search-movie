/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

(function(){
    'use strict';
    angular
        .module('app.movie')
        .controller('MovieCtrl', movieCtrl);

    /**
     * @param {object} $location - window.location
     * @param {object} $window - window object
     * @param {object} $route
     * @param {object} detailsMovie - service
     * @param {object} configApi - provider
     */
    function movieCtrl($location, $window, $route, detailsMovie, configApi){
        var vm      = this,
            page    = 1,
            cast    = [];

        vm.href             = configApi.img;
        vm.requestSimilar   = requestSimilar;
        vm.requestMethod    = requestMethod;
        vm.idMovie          = $location.search().movie;
        vm.resultsSimilar   = [];
        vm.showBoton        = true;
        vm.showMoreCast     = false;
        vm.getMoreCast      = getMoreCast;
        vm.reloadPage       = reload;
        vm.resultsReview    = [];
        vm.translations     = [];
        vm.videoYoutube     = [];
        vm.release_date     = [];
        vm.crew             = [];
        vm.cast             = [];
        vm.title            = "";
        vm.poster_path      = "";
        vm.release_date     = "";
        vm.coutries         = [];
        vm.genres           = [];
        vm.tagline          = "";
        vm.budget           = 0;
        vm.revenue          = 0;
        vm.overview         = "";
        vm.runtime          = 0;
        vm.totalLoad        = 0;
        vm.total            = 0;
        vm.loadAdvanced     = 20;

        $window.onpopstate = actionHistory;

        vm.requestMethod();

        /**
         * @param {number} id - window.location
         */
        function reload(id){
            $route.updateParams({movie: id});
            $route.reload();
        }

        function actionHistory(){
            vm.idMovie = $location.search().movie;
            vm.requestMethod()
        }

        function requestMethod(){
            detailsMovie.main(vm.idMovie).then(
                successMain, errorResponse
            );

            detailsMovie.credits(vm.idMovie).then(
                successCredits, errorResponse
            );

            detailsMovie.releases(vm.idMovie).then(
                successReleases, errorResponse
            );

            detailsMovie.videos(vm.idMovie).then(
                successVideos, errorResponse
            );

            requestSimilar(vm.idMovie);

            detailsMovie.translations(vm.idMovie).then(
                successTranslations, errorResponse
            );

            detailsMovie.reviews(vm.idMovie).then(
                successReviews, errorResponse
            );
        }

        /**
         * @param {object} response
         */
        function successReviews(response){
            vm.resultsReviews = response.results;
        }

        /**
         * @param {object} response - window.location
         */
        function successTranslations(response){
            vm.translations = response.translations
        }

        /**
         * @param {object} response
         */
        function successVideos(response){
            vm.videoYoutube = response.results;
        }

        function successReleases(response){
            vm.release_date = response.countries;
        }

        /**
         * @param {object} response
         */
        function successCredits(response){
            vm.crew = response.crew;
            vm.cast = response.cast.slice(0, 10);
            cast    = response.cast;
            if(response.cast.length > 10) vm.showMoreCast = true;
        }

        /**
         * @param {object} response
         */
        function successMain(response){
            vm.title        = response.title;
            vm.poster_path  = response.poster_path;
            vm.release_date = response.release_date;
            vm.coutries     = response.production_countries;
            vm.genres       = response.genres;
            vm.tagline      = response.tagline;
            vm.budget       = response.budget;
            vm.revenue      = response.revenue;
            vm.overview     = response.overview;
            vm.runtime      = response.runtime;
        }

        /**
         * @param {number} idMovie
         */
        function requestSimilar(idMovie){
            detailsMovie.similar(idMovie, page).then(
                successSimilar, errorResponse
            );
        }

        /**
         * @param {object} response
         */
        function successSimilar(response){
            var advanced = 0;

            vm.resultsSimilar   = vm.resultsSimilar.concat(response.results);
            vm.totalLoad        = vm.resultsSimilar.length;
            vm.total            = response.total_results;

            advanced = vm.total - vm.totalLoad;
            if(advanced<20){
                vm.loadAdvanced = advanced;
            } else {
                vm.loadAdvanced = 20;
            }

            if(response.total_pages === page) {
                vm.showBoton = false;
                return;
            }
            page++;
        }

        function getMoreCast(){
            vm.cast         = cast;
            vm.showMoreCast = false;
        }

        /**
         * @param {string} response
         */
        function errorResponse(response){
            console.log(response);
        }
    }
})();
