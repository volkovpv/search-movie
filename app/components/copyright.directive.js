/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

'use strict';
(function () {
    angular
        .module('app')
        .directive('copyrightDir', copyright);

    function copyright(){
        return {
            restrict: 'EA',
            template: '&copy; 2016 {{year}} <a target="_blank" href="https://github.com/volkovpv/search-movie">Исходники на github.com</a>',
            link: function (scope) {
                var year = new Date().getFullYear();
                if(year !== 2016){
                    scope.year = '- '+year;
                }

            }
        }
    }
})();