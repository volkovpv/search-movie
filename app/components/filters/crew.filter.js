/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

'use strict';
(function () {
    angular
        .module('app')
        .filter('crew', crew);

    function crew(){
        return returnCrew;
    }

    /**
     * @param {array} data - crew
     * @param {string} type - type job
     * @return {string} the enumeration of crew
     */
    function returnCrew(data, type){
        if(Array.isArray(data)){
            var i           = data.length,
                directors   = [];

            if(type === 'Cast'){
                while(i--){
                    directors.push(data[i].name);
                }
                return directors.join(", ");
            }


            while(i--){
                if(data[i].job === type){
                    directors.push(data[i].name);
                }
            }

            return directors.join(", ");
        }
    }
})();