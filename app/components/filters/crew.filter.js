/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

'use strict';
(function () {
    angular
        .module('app')
        .filter('crew', crew);

    function crew(){
        return function(data, type){
            if(Array.isArray(data)){
                var i           = data.length,
                    directors   = [];

                while(i--){
                    if(data[i].job === type){
                        directors.push(data[i].name);
                    }
                }

                return directors.join(", ");
            }

        }
    }
})();