/**
 * Created by https://github.com/volkovpv on 01.2016.
 */

(function () {
    'use strict';
    angular
        .module('app')
        .directive('backTop', backTop);

    /**
     * Button "back-top"
     * Restrict type 'EA'
     * @return {Object}
     */
    function backTop($window){
        return {
            restrict: 'EA',
            transclude: true,
            replace: true,
            template: '<div class="back-top"><button>Вверх</button></div>',
            scope: {
                speed: "@scrollSpeed",
                theme: "@buttonTheme"
            },
            link: function(scope, element) {
                scope.speed = parseInt(scope.speed, 10) || 300;
                scope.theme = scope.theme || 'light';

                var self = this;

                scope.currentYPosition = function() {
                    if ($window.pageYOffset)
                        return $window.pageYOffset;
                    if (document.documentElement && document.documentElement.scrollTop)
                        return document.documentElement.scrollTop;
                    if (document.body.scrollTop)
                        return document.body.scrollTop;
                    return 0;
                };

                scope.smoothScroll = function() {
                    var startY = scope.currentYPosition();
                    var stopY = 0;
                    var distance = stopY > startY ? stopY - startY : startY - stopY;
                    if (distance < 100) {
                        scrollTo(0, stopY);
                        return;
                    }
                    var speed = Math.round(scope.speed / 100);
                    var step = Math.round(distance / 25);
                    var leapY = stopY > startY ? startY + step : startY - step;
                    var timer = 0;
                    if (stopY > startY) {
                        for (var i = startY; i < stopY; i += step) {
                            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                            leapY += step;
                            if (leapY > stopY) leapY = stopY;
                            timer++;
                        }
                        return;
                    }
                    for (var j = startY; j > stopY; j -= step) {
                        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                        leapY -= step;
                        if (leapY < stopY) leapY = stopY;
                        timer++;
                    }
                };

                scope.button = element.find('button');

                scope.button.on('click', function() {
                    scope.smoothScroll();
                    element.removeClass('show');
                });

                $window.addEventListener('scroll', function() {
                    if ($window.pageYOffset > 0) {
                        element.addClass('show');
                    } else {
                        element.removeClass('show');
                    }
                });
            }
        };
    }
})();
