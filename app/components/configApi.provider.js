/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

'use strict';

(function () {
    angular
        .module('app')
        .provider('configApi', configApi);

    function configApi(){
        this._url = 'http://api.themoviedb.org/3';
        this.$get = function() {
            return this._url;
        };

        this.setUrl = function(url) {
            this._url = url;
        };
    }
})();
