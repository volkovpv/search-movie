/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

(function () {
    'use strict';
    angular
        .module('app')
        .service('movies', movies);

    /**
     * Class methods of service
     * @param {function} requestTheMovieDB - factory
     */
    function movies(requestTheMovieDB){
        /**
         * @param {number} page - page popular movies
         * @return {object} promise
         */
        this.popularMovies = function(page){
            var uri = '/movie/popular?api_key=72b56103e43843412a992a8d64bf96e9&language=ru&page='+page;
            return requestTheMovieDB(uri)
        };

        /**
         * @param {string} query - query in search
         * @param {number} page - number page
         * @return {object} promise
         */
        this.searchMovies = function(query, page){
            var query = encodeURIComponent(query);
            var uri = '/search/movie?api_key=72b56103e43843412a992a8d64bf96e9&language=ru&query='+query+'&page='+page;
            return requestTheMovieDB(uri)
        }
    }
})();
