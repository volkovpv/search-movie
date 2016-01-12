/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

(function () {
    'use strict';
    angular
        .module('app')
        .filter('enumData', enumData);

    function enumData(){
        return returnEnumData;
    }

    /**
     * @param {array} data - array data
     * @return {string} the enumeration
     */
    function returnEnumData(data){
        if(Array.isArray(data)){
            var countries = data.map(function(current){
                return current.name;
            });

            return countries.join(", ");
        }
    }
})();