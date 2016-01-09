/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

(function () {
    'use strict';
    angular
        .module('app')
        .service('detailsMovie', detailsMovie);

    function detailsMovie(requestTheMovieDB){
        this.main = function(id){
            var uri = '/movie/'+id+'?api_key=72b56103e43843412a992a8d64bf96e9&language=ru';
            return requestTheMovieDB(uri);
        };

        this.credits = function(id){
            var uri = '/movie/'+id+'/credits?api_key=72b56103e43843412a992a8d64bf96e9&language=ru';
            return requestTheMovieDB(uri)
        };

        this.releases = function(id){
            var uri = '/movie/'+id+'/releases?api_key=72b56103e43843412a992a8d64bf96e9&language=ru';
            return requestTheMovieDB(uri)
        };

        this.videos = function(id){
            var uri = '/movie/'+id+'/videos?api_key=72b56103e43843412a992a8d64bf96e9&language=ru';
            return requestTheMovieDB(uri)
        };
        
        this.translations = function(id){
            var uri = '/movie/'+id+'/translations?api_key=72b56103e43843412a992a8d64bf96e9&language=ru';
            return requestTheMovieDB(uri)
        };

        this.similar = function(id){
            var uri = '/movie/'+id+'/similar?api_key=72b56103e43843412a992a8d64bf96e9&language=ru';
            return requestTheMovieDB(uri)
        };

        this.reviews = function(id){
            var uri = '/movie/'+id+'/reviews?api_key=72b56103e43843412a992a8d64bf96e9&language=ru';
            return requestTheMovieDB(uri)
        };
    }
})();