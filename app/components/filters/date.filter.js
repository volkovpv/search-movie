/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

(function () {
    'use strict';
    angular
        .module('app')
        .filter('filterDate', filterDate);

    function filterDate(){
        return function(stringDate, type){
            //console.log(typeof stringDate);
            if(typeof stringDate === "string" && (type === "Year" || type === "RussianCulture")){
                var typeDate    = new Date(Date.parse(stringDate)),
                    day         = typeDate.getDate(),
                    month       = typeDate.getMonth() + 1,
                    dayStr      = day < 10 ? "0" + day : day,
                    monthStr    = month < 10 ? "0" + month : month;

                if(type === "Year"){
                    return typeDate.getFullYear();
                }

                if(type === "RussianCulture"){
                    return dayStr + "." + monthStr + "." + typeDate.getFullYear();
                }
            }


        }
    }
})();
