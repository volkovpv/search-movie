/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

(function(){
    'use strict';
    angular
        .module('app.movie')
        .controller('MovieCtrl', movieCtrl);
    function movieCtrl($location, detailsMovie){
        var vm = this;
        var idMovie = $location.search().movie;

        vm.href = "http://image.tmdb.org/t/p/w185/";

        vm.requestMethod = function(){
            detailsMovie.main(idMovie).then(
                successMain, errorResponse
            );

            detailsMovie.credits(idMovie).then(
                successCredits, errorResponse
            );

            detailsMovie.releases(idMovie).then(
                successReleases, errorResponse
            );

            detailsMovie.videos(idMovie).then(
                successVideos, errorResponse
            );

            detailsMovie.translations(idMovie).then(
                successTranslations, errorResponse
            );

            detailsMovie.similar(idMovie).then(
                successSimilar, errorResponse
            );

            detailsMovie.reviews(idMovie).then(
                successReviews, errorResponse
            );

            function successReviews(response){
                var data = response;
            }

            function successSimilar(response){
                var data = response;
            }

            function successTranslations(response){
                var data = response;
            }

            function successVideos(response){
                var data = response;
                vm.videoYoutube = data.results;
            }

            function successReleases(response){
                var data = response;
                vm.release_date = data.countries;
            }

            function successCredits(response){
                var data = response;
                vm.crew = data.crew;
                vm.cast = data.cast;
            }

            function successMain(response){
                var data = response;
                vm.title = data.title;
                vm.poster_path = data.poster_path;
                vm.release_date = data.release_date;
                vm.coutries = data.production_countries;
                vm.genres = data.genres;
                vm.tagline = data.tagline;
                vm.budget = data.budget;
                vm.revenue = data.revenue;

            }

            function errorResponse(response){
                console.log(response);
            }

        };



        vm.requestMethod();
    }
})();
