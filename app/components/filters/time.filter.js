/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

(function () {
    'use strict';
    angular
        .module('app')
        .filter('timeFilter', timeFilter);

    function timeFilter(){
        return returnTimeFilter;
    }

    /**
     * @param {string} time - the time in minutes
     * @return {string} the time in format HH:MM
     */
    function returnTimeFilter(time){
        var h = time / 60 ^ 0;
        if (h) {
            var m = time % 60;
            if (m < 10) m = '0' + m;
            time = h + ':' + m;
        }
        return time;

    }
})();

