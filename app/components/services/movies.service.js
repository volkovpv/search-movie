/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

(function () {
    'use strict';
    angular
        .module('app')
        .service('movies', movies);

    function movies(requestTheMovieDB){
        this.popularMovies = function(page){
            var uri = '/movie/popular?api_key=72b56103e43843412a992a8d64bf96e9&language=ru&page='+page;
            return requestTheMovieDB(uri)
        };

        this.searchMovies = function(query, page){
            var query = encodeURIComponent(query);
            var uri = '/search/movie?api_key=72b56103e43843412a992a8d64bf96e9&language=ru&query='+query+'&page='+page;
            return requestTheMovieDB(uri)
        }
    }
})();
