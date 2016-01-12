/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

(function () {
    'use strict';
    angular
        .module('app')
        .service('detailsMovie', detailsMovie);

    /**
     * Class methods of service
     * @param {function} requestTheMovieDB - factory
     */
    function detailsMovie(requestTheMovieDB){
        /**
         * @param {number} id - id movie
         * @return {object} promise
         */
        this.main = function(id){
            var uri = '/movie/'+id+'?api_key=72b56103e43843412a992a8d64bf96e9&language=ru';
            return requestTheMovieDB(uri);
        };

        /**
         * @param {number} id - id movie
         * @return {object} promise
         */
        this.credits = function(id){
            var uri = '/movie/'+id+'/credits?api_key=72b56103e43843412a992a8d64bf96e9&language=ru';
            return requestTheMovieDB(uri)
        };

        /**
         * @param {number} id - id movie
         * @return {object} promise
         */
        this.releases = function(id){
            var uri = '/movie/'+id+'/releases?api_key=72b56103e43843412a992a8d64bf96e9&language=ru';
            return requestTheMovieDB(uri)
        };

        /**
         * @param {number} id - id movie
         * @return {object} promise
         */
        this.videos = function(id){
            var uri = '/movie/'+id+'/videos?api_key=72b56103e43843412a992a8d64bf96e9&language=ru';
            return requestTheMovieDB(uri)
        };

        /**
         * @param {number} id - id movie
         * @return {object} promise
         */
        this.translations = function(id){
            var uri = '/movie/'+id+'/translations?api_key=72b56103e43843412a992a8d64bf96e9&language=ru';
            return requestTheMovieDB(uri)
        };

        /**
         * @param {number} id - id movie
         * @param {number} page - number page
         * @return {object} promise
         */
        this.similar = function(id, page){
            var uri = '/movie/'+id+'/similar?api_key=72b56103e43843412a992a8d64bf96e9&language=ru&page='+page;
            return requestTheMovieDB(uri)
        };

        /**
         * @param {number} id - id movie
         * @return {object} promise
         */
        this.reviews = function(id){
            var uri = '/movie/'+id+'/reviews?api_key=72b56103e43843412a992a8d64bf96e9&language=ru';
            return requestTheMovieDB(uri)
        };
    }
})();