/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

(function(){
    'use strict';
    angular
        .module('app.movie')
        .controller('MovieCtrl', movieCtrl);
    function movieCtrl($location, detailsMovie, $route){
        var vm = this;
        var idMovie = $location.search().movie;
        var page = 1;

        vm.href = "http://image.tmdb.org/t/p/w185/";
        vm.requestSimilar = requestSimilar;
        vm.requestMethod = requestMethod;
        vm.idMovie = idMovie;
        vm.resultsSimilar = [];
        vm.showBoton = true;

        vm.reloadPage = function(id){
            $route.updateParams({movie: id});
            $route.reload();
        };

        vm.requestMethod();

        function requestMethod(){
            requestSimilar(idMovie);

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

            detailsMovie.reviews(idMovie).then(
                successReviews, errorResponse
            );

            function successReviews(response){
                var data = response;
                vm.resultsReviews = data.results;
            }

            function successTranslations(response){
                var data = response;
                vm.translations = data.translations
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

        }



        function requestSimilar(idMovie){
            detailsMovie.similar(idMovie, page).then(
                successSimilar, errorResponse
            );

            function successSimilar(response){
                var data = response;
                vm.resultsSimilar = vm.resultsSimilar.concat(data.results);
                vm.totalLoad = vm.resultsSimilar.length;
                vm.total = data.total_results;

                var advanced = vm.total - vm.totalLoad;
                if(advanced<20){
                    vm.loadAdvanced = advanced;
                } else {
                    vm.loadAdvanced = 20;
                }

                if(data.total_pages === page) {
                    vm.showBoton = false;
                    return;
                }
                page++;
            }
        }

        function errorResponse(response){
            console.log(response);
        }



    }
})();
