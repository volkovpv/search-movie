/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

(function () {
    'use strict';
    angular
        .module('app')
        .filter('timeFilter', timeFilter);

    function timeFilter(){
        return function(data){
            var h = data / 60 ^ 0;
            if (h) {
                var m = data % 60;
                if (m < 10) m = '0' + m;
                data = h + ':' + m;
            }
            return data;

        }
    }
})();

