/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

(function () {
    'use strict';
    angular
        .module('app')
        .provider('configApi', configApi);

    /**
     * This function set base url for the api themoviedb.org
     * The setUrl method allow change a url api
     */
    function configApi(){
        this._url = {
            api: 'http://api.themoviedb.org/3',
            img: 'http://image.tmdb.org/t/p/w185/'
        };
        this.$get = function() {
            return this._url;
        };

        /**
         * @param {object} url
         */
        this.setUrl = function(url) {
            this._url = url;
        };
    }
})();
